import React, { useState, useEffect, useRef, useCallback } from 'react';
import socketIOClient from 'socket.io-client';
import useFetch from '../../hooks/useFetch';
import { useAppContext } from '../App/AppContext';
import {
  Container,
  Sidebar,
  SideTab,
  Columns,
  SidebarList,
  Spinner,
  ChannelHeader,
  Message,
  ThreadForm
} from '../../components';
import {
  prettifyMessage,
  loadChannelMessagesIntoStore,
  fetchMembersData
} from './utils';
import { messageEvent, connectedEvent } from '../../constants/constants';
import './Workspace.css';

function Workspace({ match }) {
  const workspaceId = match.params.id;
  // TODO: Change later
  const endpoint = 'http://localhost:8000/';

  const clientSocket = useRef(null);
  const userData = useAppContext();
  const currentUser = userData.loginStatus.user;

  const [activeChannel, setActiveChannel] = useState({
    id: match.params.channelId,
    name: match.params.channelName
  });
  const [messageStore, setMessageStore] = useState({});
  const [members, setMembers] = useState([]);

  const changeActiveChannel = async (channelId, name) => {
    if (!messageStore[channelId]) {
      loadChannelMessagesIntoStore(channelId, setMessageStore);
    }
    setActiveChannel({
      id: channelId,
      name
    });
  };

  const handleIncomingMessage = (messageObj) => {
    const { channel } = messageObj;
    setMessageStore((store) => ({
      ...store,
      [channel]: {
        ...store[channel],
        messages: [...store[channel].messages, { ...messageObj }]
      }
    }));
  };

  const setUpSocket = (socket) => {
    socket.on(messageEvent, (obj) => handleIncomingMessage(obj));
    socket.on(connectedEvent, () =>
      console.log(`Connected to server! - id: ${socket.id}`)
    );
  };

  const handleSend = (e) => {
    e.preventDefault();
    const socket = clientSocket.current;
    const content = document.getElementsByClassName('textarea')[0].value;
    document.getElementsByClassName('textarea')[0].value = '';

    const messageObj = {
      from: currentUser._id,
      to: activeChannel.id,
      fromUser: currentUser.name,
      message: content,
      channel: activeChannel.id,
      workspace: workspaceId,
      isComment: false
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

    const { id, name } = activeChannel;
    if (channels && id) {
      changeActiveChannel(id, name);
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

  const renderMessages = () => {
    if (messageStore[activeChannel.id]) {
      return (
        <div id="messages">
          {messageStore[activeChannel.id].messages.map((message) => (
            <Message {...prettifyMessage(message)} />
          ))}
        </div>
      )
    }
    return <div id="messages"><Spinner /></div>;
    
  }
  return (
    <Container>
      <div className="level">
        <div className="level-left content">
          <h1>{workspace.name}</h1>
        </div>
        <div className="level-right content">
          <h3>{currentUser.name}</h3>
        </div>
      </div>
      <Columns>
        <Sidebar>
          <SidebarList list={prettyChannels} heading="Channels" action="+" />
          <SidebarList list={prettyMembers} heading="Users" action="+" />
        </Sidebar>

        <div className="column is-9 channel-body">
          {activeChannel.id ? (
            <>
              <ChannelHeader heading={`#${activeChannel.name}`} actions={[]} />
              { renderMessages()}
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
      </Columns>
    </Container>
  );
}

export default Workspace;
