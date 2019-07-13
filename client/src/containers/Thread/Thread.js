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

import './Thread.css';

function Thread({ match }) {
  // TODO: fill with real data later

  const toggleSelected = (e, content) => {
    e.target.classList.toggle('isSelected');
    // setActiveChannel();
  }

  const [Channels, setChannels] = useState([]);
  
  const workspace = 'coderhood';
  // const members = [ 'User One', 'User Two' ];
  const channels = Channels.map(channel => <SideTab content={channel.name} onClick={toggleSelected} key={channel._id} />);
  const workspaceId = match.params.id || '5d28ecbbc8d9dd16d8dca1b8';
  const endpoint = 'http://localhost:8000/'
  const userId = '5d28eb1ec8d9dd16d8dca1b4'; // Kunal's
  
  const usernames = ["Jane", "Fed", "Mary", "April", "Aunt May", "June", "Julian","Augustus", "Sebin", "Octoman", "Novan", "Dex"];

  const clientSocket = useRef(null);
  const workspaceName = useRef('');
  const threadIdCounter = useRef(null);

  const [username, setUsername] = useState('Anonymous');
  const [activeChannel, setActiveChannel] = useState('general');
  const [members, setMembers] = useState([])
  const [messages, setMessages] = useState({
    general: {
      msgs: [],
      unread : false,
    },
  })

  const fetchChannels = async () => {
    const { id } = match.params;
    const result = await callApi('post', '/channel/all', {workspace: id})
    const { data } = result.data.Data;
    setChannels(data);
  }

  useEffect(() => {
    //set random username
    fetchChannels();
    setUsername(`${usernames[Math.floor(Math.random() * usernames.length)]}`);
    threadIdCounter.current = Math.floor(Math.random() * 10000);

    let socket = socketIOClient(endpoint + workspaceId, { path : '/sockets/'} );
    clientSocket.current = socket;

    // Fetch workspace data
    const membersPromise = fetchWorkspaceMembers();
    fetchAndPopulateUsers(membersPromise);


    socket.on('message', (obj) => handleIncomingMessage(obj))
    socket.on('connected', () => console.log(`Connected to server! - id: ${socket.id}`));
  }, [])

  const fetchWorkspaceMembers = async () => {
    const result =  await callApi('get', `/workspace/${workspaceId}`);
    const { Data } = result.data;
    workspaceName.current = Data.name;
    return Data.members;
    
  }

  const fetchAndPopulateUsers = async (promise) => {
    const members = await promise;
    const allUsers = await callApi('get', '/user').then(result => result.data.Data.data);
    const relevantUsers = allUsers.filter(user => members.includes(user._id));
    setMembers(relevantUsers);
  }

  const headerTitle = "# Channel Name";
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
        unread: true,
        msgs: [...store[channel].msgs, modMsg],
      }
    }));
  }

  const handleSend = () => {
    const socket = clientSocket.current;
    const content = document.getElementsByClassName('textarea')[0].value;
    threadIdCounter.current += 1;
    const msg = {
      threadId: threadIdCounter.current,
      userName: username,
      userPic: 'https://dummyimage.com/64x64/000/fff&text=MrAnderson',
      timeSince: '1 min ago...',
      message: content,
      // messageActions,
    }
    const msgObj = {
      channel: activeChannel,
      user: username,
      timestamp: Date.now(),
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
          <ThreadHeader heading={`#${activeChannel} -- user: ${username}`} actions={headerActions} />
          {console.log(messages[activeChannel])}
          {messages[activeChannel].msgs.map(message => <ThreadMessage {...message} />)}
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
