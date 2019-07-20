import React, { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import useFetch from '../../hooks/useFetch';
import { useAppContext } from '../App/AppContext';
import { ChannelMembers } from '../../containers';
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
} from '../../components';
import {
  prettifyMessage,
  loadChannelMessagesIntoStore,
  fetchMembersData,
  loadUserMessagesIntoStore
} from './utils';
import { messageEvent, connectedEvent } from '../../constants/constants';
import './Workspace.css';

function Workspace({ match }) {
  const workspaceId = match.params.id;
  // TODO: Change later
  const endpoint = 'http://localhost:8000/';

  const clientSocket = useRef(null);
  const channelsLoaded = useRef([]);
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

  const [messageStore, setMessageStore] = useState({});
  const [members, setMembers] = useState([]);
  const [membersPanel, setMembersPanel] = useState(false);
  const [profilePanel, setProfilePanel] = useState(false);


  const changeActiveChannel = async (channelId, name, isUser) => {
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
    setMembersPanel(true);
  }

  const setUpSocket = (socket) => {
    socket.on(messageEvent, (obj) => handleIncomingMessage(obj));
    socket.on(connectedEvent, () =>
      console.log(`Connected to server! - id: ${socket.id}`)
    );
  };

  const handleSend = (e) => {
    e.preventDefault();
    const socket = clientSocket.current;
    // FIXME: Change when MessageForm is refactored
    const content = document.getElementsByClassName('textarea')[0].value;
    document.getElementsByClassName('textarea')[0].value = '';
    const messageObj = {
      from: currentUser._id,
      to: activeChannel.id,
      fromUser: currentUser.name,
      message: content,
      channel: activeChannel.id,
      workspace: workspaceId,
      isComment: false,
      isConversation: activeChannel.isUser
    };
    socket.emit(messageEvent, messageObj);
  };

  const fetchedWorkspaceData = useFetch('get', `/workspace/${workspaceId}`);
  const {
    isLoading: isWorkspaceLoading,
    response: workspaceResponse
  } = fetchedWorkspaceData;
  const workspace = workspaceResponse ? workspaceResponse.data : null;

  const fetchedChannels = useFetch('post', '/channel/all', {
    workspace: workspaceId
  });

  const {
    isLoading: isChannelsLoading,
    response: channelsData
  } = fetchedChannels;
  const channels = channelsData ? channelsData.data.data : [];
  const prettyChannels = channelsData
    ? channels.map(({ _id, name }) => (
      <SideTab
        key={_id}
        content={name}
        id={_id}
        workspace={workspaceId}
        onClick={changeActiveChannel}
      />
    ))
    : [];
  const prettyMembers = members.map(({ _id, name }) => (
    <SideTab
      isUser={true}
      key={_id}
      content={name}
      id={_id}
      workspace={workspaceId}
      onClick={changeActiveChannel}
    />
  ));

  // To setup socket and load channel from URL
  useEffect(() => {
    let socket = socketIOClient(endpoint + workspaceId, { path: '/sockets/' });
    clientSocket.current = socket;
    setUpSocket(socket);

    const { id, name, isUser } = activeChannel;
    if (channels && id) {
      channelsLoaded.current.push(id);
      changeActiveChannel(id, name, isUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (workspace) {
      const { members } = workspace;
      fetchMembersData(members, setMembers).then((result) =>
        setMembers(result)
      );
    }
  }, [workspace]);

  if (isWorkspaceLoading || isChannelsLoading) {
    return <Spinner cls="la-2x" />;
  }

  const getMessageContainerSize = () => {
    return membersPanel ? "is-5" : "is-9";
  }

  const renderMessages = () => {
    if (messageStore[activeChannel.id]) {
      return (
        <div id="messages">
          {messageStore[activeChannel.id].messages.map((message) => (
            <Message {...prettifyMessage(message)} />
          ))}
        </div>
      );
    }
        return <div id="messages"><Spinner /></div>;

      }
      return (
    <div>
          <Container>
            <div className="level">
              <div className="level-left content">
                <h1>{workspace.name}</h1>
              </div>

        </div>
        <Columns>
          <Sidebar>
            <SidebarList list={prettyChannels} heading="Channels" action="+" />
            <SidebarList list={prettyMembers} heading="Users" action="+" />
          </Sidebar>

          <div className={"column channel-body " + getMessageContainerSize()}>
            {activeChannel.id ? (
              <>
                <ChannelHeader heading={`#${activeChannel.name}`} actions={[]} handleViewMembers={handleViewMembers} />
                {renderMessages()}
                <div className="fixed form">
                  <ThreadForm onClick={handleSend} />
                </div>
              </>
            ) : (
                <div className="content">
                  <h1>Welcome to slack-clone </h1>
                </div>
              )}
          </div>

          <div className="column is-4">
            {activeChannel.id && membersPanel ?
              <ChannelMembers channelId={activeChannel.id} workspaceMembers={members}
                handleClose={() => { setMembersPanel(false) }} /> : null}
          </div>
        </Columns >
      </Container >
    </div>
  );
}

export default Workspace;
