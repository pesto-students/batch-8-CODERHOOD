import React,{ useState, useRef, useEffect } from "react";
import socketIOClient from 'socket.io-client'


import Container from '../../components/Container/Container';
import Sidebar from '../../components/Sidebar/Sidebar';
import Columns from '../../components/Columns/Columns';
import SidebarList from '../../components/SidebarList/SidebarList';
import ThreadHeader from '../../components/ThreadHeader/ThreadHeader';
import ThreadMessage from '../../components/ThreadMessage/ThreadMessage';
import ThreadForm from '../../components/ThreadForm/ThreadForm';
import SideTab from '../../components/SideTab/SideTab';
import Spinner from '../../components/Spinner/Spinner';
import callApi from '../../libs/axios';
import getUser from '../../libs/getUser';

import './Thread.css';

function Thread({ match, history }) {
  const workspaceId = match.params.id;
  const endpoint = 'http://localhost:8000/'

  const clientSocket = useRef(null);
  const workspaceName = useRef('');
  const threadIdCounter = useRef(null);

  const [username, setUsername] = useState('Anonymous');
  const [activeChannel, setActiveChannel] = useState({
    id: 1111,
    name: 'general',
  });
  const [members, setMembers] = useState([])
  const [Channels, setChannels] = useState([]);
  const [messages, setMessages] = useState({
    1111: {
      msgs: [],
      unread : false,
    },
  })

  const toggleSelected = async (e, id, content) => {
    // e.target.classList.toggle('isSelected');
    const messages = await fetchChannelMessages(id);
    setActiveChannel({
      id,
      name: content,
    });
    const channelMessages = await printMessages(messages);
    console.log('channel:::::::::::::', channelMessages);
    setMessages((store) => ({
      ...store,
      [id]: {
        msgs: channelMessages || [],
        unread: false,
      }
    }));
  }

  
  const channels = Channels.map(({ _id, name}) => 
  <SideTab
    content={name}
    id={_id}
    onClick={toggleSelected}
    key={_id}
  />);

  const fetchChannelMessages = async (channelID) => {
    const result = await callApi('post', '/message/all', {channel: channelID});
    console.log('messages', result);
    if (result.data) {
      const { data } = result.data.Data;
      return data;
    }
    return [];
  }
  
  const fetchChannels = async () => {
    const { id } = match.params;
    const result = await callApi('post', '/channel/all', {workspace: id})
    const { data } = result.data.Data;

    const genericChannelDataObj = {
      msgs: [],
      unread : false,
    }

    data.forEach(channel => {
      setMessages((store) => ({
        ...store,
        [channel._id]: {
          ...genericChannelDataObj,
        }
      }))
    });
    setChannels(data);
  }

  const fetchWorkspaceMembers = async () => {
    const result =  await callApi('get', `/workspace/${workspaceId}`);
    const { Data } = result.data;
    workspaceName.current = Data.name;
    const members = Data.members.filter(member => member !== getUser()._id);
    return members;
  }

  const fetchAndPopulateUsers = async (promise) => {
    const members = await promise;
    const allUsers = await callApi('get', '/user').then(result => result.data.Data.data);
    const relevantUsers = allUsers.filter(user => members.includes(user._id));
    setMembers(relevantUsers);
  }

  useEffect(() => {
    //set random username
    fetchChannels();
    setUsername(getUser().name);
    threadIdCounter.current = Math.floor(Math.random() * 10000);

    let socket = socketIOClient(endpoint + workspaceId, { path : '/sockets/'} );
    clientSocket.current = socket;

    // Fetch workspace data
    const membersPromise = fetchWorkspaceMembers();
    fetchAndPopulateUsers(membersPromise);

    console.log(channels);

    socket.on('message', (obj) => handleIncomingMessage(obj))
    socket.on('connected', () => console.log(`Connected to server! - id: ${socket.id}`));
  }, [])

  const headerActions = [
    <i class="fas fa-info-circle"></i>,
    <i class="fas fa-check-square"></i>,
    <i class="fas fa-ban"></i>
  ];

  const messageActions = [
    <span className="icon is-small"><i className="fas fa-reply"></i></span>,
    <span className="icon is-small"><i className="fas fa-heart"></i></span>,
  ];

  const handleIncomingMessage = (msgObj) => {
    const { channel, user, msg } = msgObj;
    const modMsg = {
      ...msg,
      messageActions
    }
    console.log(modMsg);
    setMessages((store) => ({
      ...store,
      [channel]: {
        unread: false,
        msgs: [...store[channel].msgs, modMsg],
      }
    }));
  }

  const printMessages = (messages) => {
    const { messages: channelMessages } = activeChannel;
    const mapMessgaesArray = channelMessages || messages;
    const arrayOfMessages = mapMessgaesArray.map(message => {
      const messageObject = {
        threadId: message._id,
        userName: message.user,
        userPic: 'https://dummyimage.com/64x64/000/fff&text=MrAnderson',
        timeSince: `${message.created_At}`,
        message: message.message,
        messageActions,
      }
      return messageObject;
    });
    console.log('araayM::::', arrayOfMessages);
    return arrayOfMessages;
  }

  const handleSend = () => {
    console.log(channels);
    console.log(messages);
    const socket = clientSocket.current;
    const content = document.getElementsByClassName('textarea')[0].value;
    const date = new Date();
    threadIdCounter.current += 1;
    const msg = {
      threadId: threadIdCounter.current,
      userName: username,
      userPic: 'https://dummyimage.com/64x64/000/fff&text=MrAnderson',
      timeSince: 'just now',
      message: content,
      // messageActions,
    }
    const msgObj = {
      channel: activeChannel.id,
      user: username,
      userId: getUser()._id,
      timestamp: Date.now(),
      workspace: workspaceId,
      msg,
    }
    socket.emit('message', msgObj);
  }

  return (
    <Container>
      { members.length === 0 
      ? <Spinner />
      :
      <Columns>
        <Sidebar>
          <SidebarList list={channels} heading="Channels" action="+" />
          <SidebarList list={members.map(({ name }) => name)} heading="Users" action="+" />
        </Sidebar>
        <div className="column is-9 thread-body">
          <ThreadHeader heading={workspaceName.current} />
          <ThreadHeader heading={`#${activeChannel.name} -- user: ${username}`} actions={headerActions} />
          {console.log(activeChannel)}
          {console.log('at id ...', activeChannel.id)}
          {console.log('eror:::::::::::::', messages)}
          {messages[activeChannel.id].msgs.map(message => <ThreadMessage {...message} />)}
          <ThreadForm onClick={handleSend} />

        </div>
      </Columns>
      }
    </Container>
  );
}

  // {
  //   threadId: 234,
  //   userName: 'Mr Anderson',
  //   userPic: 'https://dummyimage.com/64x64/000/fff&text=MrAnderson',
  //   timeSince: '28m',
  //   message: 'I know lorem ipsum.',
  //   messageActions,
  // },

export default Thread;
