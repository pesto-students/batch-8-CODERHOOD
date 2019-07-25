import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import useFetch from '../../hooks/useFetch';
import { useAppContext } from '../App/AppContext';
import { ChannelMembers, ViewProfile } from '../../containers';
import AddChannelModal from '../../containers/AddChannel/AddChannelModal';
import AddUserModal from '../../containers/AddUser/AddUserModal';
import Dropdown from '../../components/Dropdown/Dropdown';
import Profile from '../Profile/Profile';

import {
  Container,
  Sidebar,
  SideTab,
  Columns,
  SidebarList,
  Spinner,
  ChannelHeader,
  Message,
  ThreadForm,
  ChannelNotification
} from '../../components';
import {
  prettifyMessage,
  loadChannelMessagesIntoStore,
  fetchMembersData,
  loadUserMessagesIntoStore
} from './utils';
import {
  messageEvent,
  connectedEvent,
  typingEvent,
  clearTypingEvent,
  userJoiningEvent,
  userLeavingEvent
} from '../../constants/constants';
import Welcome from '../Welcome/Welcome';
import './Workspace.css';
import ScrollToBottom from 'react-scroll-to-bottom';

function Workspace({ history, match }) {
  const workspaceId = match.params.id;
  const endpoint = process.env.REACT_APP_SOCKET_ENDPOINT;

  const userTypingStatusTimeout = useRef(false);
  const clientSocket = useRef(null);
  const currentChannel = useRef(null);
  const userData = useAppContext();
  const currentUser = userData.loginStatus.user;

  const typeUser = 'usr';
  const { params } = match;
  const isActiveChannelAUser = params.type ? params.type === typeUser : false;

  const [activeChannel, setActiveChannel] = useState({
    id: params.channelId,
    name: params.channelName,
    isUser: isActiveChannelAUser
  });
  // To keep track of activeChannel in socket handler functions
  currentChannel.current = activeChannel;

  const channelsLoaded = useRef([]);
  const channels = useRef([]);

  const [messageStore, setMessageStore] = useState({});
  const [members, setMembers] = useState([]);
  const [membersPanel, setMembersPanel] = useState(false);
  const [profilePanel, setProfilePanel] = useState(false);
  const [isUserTabOpened, setUserTabOpened] = useState(false);
  const [fetchChannelTrigger, setFetchChannelTrigger] = useState(0);
  const [fetchUserTrigger, setFetchUserTrigger] = useState(0);
  const [typingNotification, setTypingNotification] = useState(null);
  const [inputFieldDisabled, setInputFieldDisabled] = useState(true);
  const [unreadChannels, setUnreadChannels] = useState([]);
  const [profileModalVisibility, setProfileModalVisibility] = useState(false);
  const { dispatch } = useAppContext();

  const [addChannelModalVisibility, setAddChannelModalVisibility] = useState(
    false
  );
  const [addUserModalVisibility, setAddUserModalVisibility] = useState(false);
  const closeAddChannelModal = () => {
    setAddChannelModalVisibility(false);
    setFetchChannelTrigger(fetchChannelTrigger + 1);
  };
  const closeAddUserModal = () => {
    setAddUserModalVisibility(false);
    setFetchUserTrigger(fetchUserTrigger + 1);
  };

  const changeActiveChannel = async (channelId, name, isUser) => {
    setUserTabOpened(isUser);
    setMembersPanel(false);
    setTypingNotification(null);

    // See if user is a part of this current channel
    if (!isUser && channels) {
      const currentChannelData = channels.current.filter(
        ({ _id }) => _id === channelId
      )[0];
      if (currentChannelData.members.includes(currentUser._id)) {
        setInputFieldDisabled(false);
      } else {
        setInputFieldDisabled(true);
      }
    } else {
      setInputFieldDisabled(false);
    }

    setProfilePanel(false);
    if (!messageStore[channelId]) {
      if (isUser) {
        loadUserMessagesIntoStore(
          workspaceId,
          channelId,
          currentUser._id,
          channelId,
          setMessageStore
        );
      } else {
        loadChannelMessagesIntoStore(channelId, setMessageStore);
      }
    }
    channelsLoaded.current.push(channelId);
    setActiveChannel({
      id: channelId,
      name,
      isUser
    });
    // Remove from unread if there
    setUnreadChannels((store) => store.filter((id) => id !== channelId));
  };

  const handleIncomingMessage = ({ isConversation, ...messageObj }) => {
    const { from, to } = messageObj;
    let { channel } = messageObj;
    // If user is the receiver of personal message, change channel to from - the id of sender.
    if (isConversation && currentUser._id === channel) {
      channel = from;
    }

    const isUserParticipant =
      currentUser._id === to || currentUser._id === from;

    if (isConversation && !isUserParticipant) {
      return null;
    }

    if (
      channel !== currentChannel.current.id &&
      !unreadChannels.includes(channel)
    ) {
      setUnreadChannels((store) => [...store, channel]);
    }

    if (!channelsLoaded.current.includes(channel)) {
      if (isConversation && isUserParticipant) {
        loadUserMessagesIntoStore(
          workspaceId,
          channel,
          currentUser._id,
          channel,
          setMessageStore
        );
      } else {
        loadChannelMessagesIntoStore(channel, setMessageStore);
      }
      return null;
    }
    setMessageStore((store) => ({
      ...store,
      [channel]: {
        ...store[channel],
        messages: [...store[channel].messages, { ...messageObj }]
      }
    }));
  };

  const handleViewMembers = () => {
    if (isUserTabOpened) {
      setProfilePanel(true);
      setMembersPanel(false);
    } else {
      setMembersPanel(true);
      setProfilePanel(false);
    }
  };

  const setUpSocket = (socket) => {
    socket.on(messageEvent, (obj) => handleIncomingMessage(obj));
    socket.on(connectedEvent, () =>
      console.log(`Connected to server! - id: ${socket.id}`)
    );
    socket.on(typingEvent, (data) => handleIncomingTypingIndication(data));
    socket.on(clearTypingEvent, () => handleClearTyping());
    socket.on(userJoiningEvent, (data) => handleUserJoinedNotification(data));
    socket.on(userLeavingEvent, (data) => handleUserLeftNotification(data));
  };

  const handleSend = (e) => {
    e.preventDefault();
    const socket = clientSocket.current;
    // FIXME: Change when MessageForm is refactored
    const content = document.getElementsByClassName('textarea')[0].value.trim();
    if (content.length === 0) {
      return null;
    }
    document.getElementsByClassName('textarea')[0].value = '';
    const messageObj = {
      from: currentUser._id,
      to: activeChannel.id,
      fromUser: currentUser.name,
      avatar: currentUser.avatar,
      message: content,
      channel: activeChannel.id,
      workspace: workspaceId,
      isComment: false,
      isConversation: activeChannel.isUser
    };
    socket.emit(messageEvent, messageObj);
  };

  const startUserTypingTimeout = () => {
    userTypingStatusTimeout.current = true;
    setTimeout(() => {
      userTypingStatusTimeout.current = false;
    }, 2000);
  };

  const handleTyping = (e) => {
    const socket = clientSocket.current;
    const wasUserTypingAlready = userTypingStatusTimeout.current;
    if (e.keyCode === 13) {
      // Enter key
      handleSend(e);
    } else if (!wasUserTypingAlready) {
      const isConversation = activeChannel.isUser;
      socket.emit(typingEvent, {
        user: currentUser.name,
        channel: activeChannel.id,
        from: currentUser._id,
        to: activeChannel.id,
        isConversation
      });
      startUserTypingTimeout();
    }
  };

  const handleIncomingTypingIndication = ({
    user,
    channel,
    from,
    to,
    isConversation
  }) => {
    const activeChannel = currentChannel.current;
    const isUserParticipant =
      currentUser._id === to || currentUser._id === from;

    if (isConversation) {
      if (!isUserParticipant) {
        return null;
      }
      let channelId = channel === currentUser._id ? from : channel;
      if (channelId === activeChannel.id) {
        setTypingNotification({
          user,
          channel: channelId
        });
      }
    } else if (channel === activeChannel.id) {
      setTypingNotification({
        user,
        channel
      });
    }
  };

  const handleClearTyping = () => {
    setTypingNotification(null);
  };

  const handleUserJoinedNotification = (notification) => {
    const { user, userId, channelId } = notification;
    if (!channelsLoaded.current.includes(channelId)) {
      return null;
    }

    let content;
    if (userId === currentUser._id) {
      content = 'You joined the channel';
      setInputFieldDisabled(false);
    } else {
      content = `${user} joined the channel`;
    }

    const notificationObject = {
      notification: true,
      content
    };
    const channel = channels.current.filter(({ _id }) => _id === channelId)[0];
    channel.members.push(userId);
    setMessageStore((store) => ({
      ...store,
      [channelId]: {
        ...store[channelId],
        messages: [...store[channelId].messages, { ...notificationObject }]
      }
    }));
  };

  const handleUserLeftNotification = (notification) => {
    const { user, userId, channelId } = notification;
    if (!channelsLoaded.current.includes(channelId)) {
      return null;
    }

    let content;
    if (userId === currentUser._id) {
      content = 'You left the channel';
      setInputFieldDisabled(true);
    } else {
      content = `${user} left the channel`;
    }

    const notificationObject = {
      notification: true,
      content
    };
    const channel = channels.current.filter(({ _id }) => _id === channelId)[0];
    channel.members = channel.members.filter((member) => member !== userId);
    setMessageStore((store) => ({
      ...store,
      [channelId]: {
        ...store[channelId],
        messages: [...store[channelId].messages, { ...notificationObject }]
      }
    }));
  };

  const prepareForSideBar = (id, name, avatar, isUser) => (
    <SideTab
      isUser={isUser ? isUser : false}
      key={id}
      content={name}
      avatar={avatar}
      id={id}
      workspace={workspaceId}
      onClick={changeActiveChannel}
      unread={unreadChannels.includes(id)}
    />
  );

  const fetchedWorkspaceData = useFetch(
    'get',
    `/workspace/${workspaceId}`,
    null,
    fetchUserTrigger
  );
  const {
    isLoading: isWorkspaceLoading,
    response: workspaceResponse
  } = fetchedWorkspaceData;
  const workspace = workspaceResponse ? workspaceResponse.data : null;
  const fetchedChannels = useFetch(
    'post',
    '/channel/all',
    {
      workspace: workspaceId
    },
    fetchChannelTrigger
  );

  const {
    isLoading: isChannelsLoading,
    response: channelsData
  } = fetchedChannels;
  channels.current = channelsData ? channelsData.data.data : [];
  const prettyChannels = channelsData
    ? channels.current.map(({ _id: id, name }) =>
        prepareForSideBar(id, name, false)
      )
    : [];
  const prettyMembers = members.map(({ _id: id, name, avatar }) =>
    prepareForSideBar(id, name, avatar, true)
  );

  // To setup socket and load channel from URL
  useEffect(() => {
    let socket = socketIOClient(endpoint + workspaceId, { path: '/sockets/' });
    clientSocket.current = socket;
    setUpSocket(socket);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (workspace) {
      const { members } = workspace;
      fetchMembersData(members, setMembers).then((result) =>
        setMembers(result)
      );
    }
    const { id, name, isUser } = activeChannel;
    if (!isChannelsLoading && id) {
      channelsLoaded.current.push(id);
      changeActiveChannel(id, name, isUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspace, isChannelsLoading]);

  const addChannel = () => {
    setAddChannelModalVisibility(true);
  };
  const addUser = () => {
    setAddUserModalVisibility(true);
  };

  const getMessageContainerSize = () => {
    return membersPanel || profilePanel ? 'is-6' : 'is-10';
  };

  if (isWorkspaceLoading || isChannelsLoading) {
    return <Spinner cls="la-2x" />;
  }

  const renderMessages = () => {
    if (messageStore[activeChannel.id]) {
      return (
        <div id="messages" style={{ marginBottom: '1em' }}>
          <ScrollToBottom className="messages">
            {messageStore[activeChannel.id].messages.map((message) => {
              if (message.notification) {
                return <ChannelNotification {...message} />;
              }
              return <Message {...prettifyMessage(message)} />;
            })}
          </ScrollToBottom>
        </div>
      );
    }
    return (
      <div id="messages">
        <Spinner />
      </div>
    );
  };

  const viewProfileHandler = () => {
    setProfileModalVisibility(true);
  };

  const logoutHandler = () => {
    // const { history } = match;
    dispatch({ type: 'logout' });
    localStorage.removeItem('user');
    history.push('/signin');
  };

  const closeProfileModal = () => {
    setProfileModalVisibility(false);
  };

  const renderChannelInfo = () => {
    if (
      messageStore[activeChannel.id] !== undefined &&
      messageStore[activeChannel.id].messages.length < 4
    ) {
      if (activeChannel.name === 'General') {
        return (
          <>
            <p style={{ margin: '2%', marginRight: '3%' }}>
              We created this channel for you. This is the very beginning of the{' '}
              <span>
                <b>#general</b>
              </span>{' '}
              channel. Purpose: This channel is for workspace-wide communication
              and announcements. All members are in this channel.
            </p>
          </>
        );
      }
      if (activeChannel.name === currentUser.name) {
        return (
          <>
            <p style={{ margin: '2%', marginRight: '3%' }}>
              <b>This is your space. </b>
              Draft messages, list your to-dos. You
              can also talk to yourself here, but please bear in mind you’ll have
              to supply both sides of the conversation.
            </p>
          </>
        );
      }
      return (
        <>
          <p style={{ margin: '2%', marginRight: '3%' }}>
            This is very beginning of your message history. Say <b>'Hi'</b> to
            start the conversation.
          </p>
        </>
      );
    }
    return null;
  };

  return (
    <div className="workspace">
      <Container>
        <Columns className="workspace-column">
          <Sidebar>
            <div className="level">
              <div className="content channel-name">
                <h4>{workspace.name}</h4>
                <h6>{currentUser.name}</h6>
              </div>
            </div>
            <SidebarList
              list={prettyChannels}
              heading="Channels"
              action={<i title="Add Channel" className="fa fa-plus-circle" />}
              actionClicked={addChannel}
            />
            <SidebarList
              list={prettyMembers}
              heading="Users"
              action={<i title="Invite User" className="fa fa-plus-circle" />}
              actionClicked={addUser}
            />

            <div
              className="level-left content channel-name"
              style={{ cursor: 'pointer' }}
            >
              <Link to="/workspaces">
                <h6 style={{ color: 'white' }}>Switch Workspace</h6>
              </Link>
            </div>
          </Sidebar>

          <div className={'column channel-body ' + getMessageContainerSize()}>
            {activeChannel.id ? (
              <>
                <ChannelHeader
                  heading={`#${activeChannel.name}`}
                  actions={[]}
                  handleViewMembers={handleViewMembers}
                  isUser={isUserTabOpened}
                />
                {renderChannelInfo()}
                {renderMessages()}
                <div className="fixed form">
                  <ThreadForm
                    onClick={handleSend}
                    textAreaProps={{ onKeyDown: handleTyping }}
                    isDisabled={inputFieldDisabled}
                  />
                  <div id="typing-indicator">
                    {typingNotification
                      ? `${typingNotification.user} typing...`
                      : null}
                  </div>
                </div>
              </>
            ) : (
              <Welcome
                firstVisit={prettifyMessage.length === 1}
                openHandle={addChannel}
                openUser={addUser}
              />
            )}
          </div>

          <div
            className="column is-4 has-top-border-2"
            style={{ height: '92.7vh', paddingLeft: '0em', marginTop: '3.8em' }}
          >
            {activeChannel.id && membersPanel ? (
              <ChannelMembers
                channelId={activeChannel.id}
                channels={channels.current}
                workspaceMembers={members}
                socket={clientSocket.current}
                handleClose={() => {
                  setMembersPanel(false);
                }}
              />
            ) : null}

            {profilePanel ? (
              <ViewProfile
                userId={activeChannel.id}
                handleClose={() => {
                  setProfilePanel(false);
                }}
              />
            ) : null}
          </div>
        </Columns>
      </Container>
      <AddChannelModal
        show={addChannelModalVisibility}
        workspaceId={workspaceId}
        members={members}
        showClose={false}
        onClose={closeAddChannelModal}
        modal={{ closeOnEsc: true }}
      />
      <AddUserModal
        show={addUserModalVisibility}
        workspaceId={workspaceId}
        showClose={false}
        onClose={closeAddUserModal}
        modal={{ closeOnEsc: true }}
      />
      <div
        style={{
          position: 'absolute',
          right: '1em',
          top: '0.5em',
          zIndex: '2'
        }}
      >
        <Profile
          show={profileModalVisibility}
          showClose={false}
          onClose={closeProfileModal}
          modal={{ closeOnEsc: true }}
        />
        <Dropdown
          title="Settings"
          items={[
            { name: 'View Profile', handler: viewProfileHandler },
            { name: 'Logout', handler: logoutHandler }
          ]}
        />
      </div>
    </div>
  );
}

export default Workspace;
