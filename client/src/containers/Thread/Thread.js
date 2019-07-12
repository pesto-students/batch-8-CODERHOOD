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

import './Thread.css';

function Thread() {
  // TODO: fill with real data later
  const toggleSelected = (e, content) => {
    e.target.classList.toggle('isSelected');
    // setActiveChannel();
  }
  
  const workspace = 'coderhood';
  const members = [ 'User One', 'User Two' ];
  const channels = [ '#general', '#signin_signout' ].map(channel => <SideTab content={channel} onClick={toggleSelected} />);
  const usernames = ["Jane", "Fed", "Mary", "April", "Aunt May", "June", "Julian","Augustus", "Sebin", "Octoman", "Novan", "Dex"];

  const clientSocket = useRef(null);
  const threadIdCounter = useRef(null);
  const endpoint = 'http://localhost:8000/'

  const [username, setUsername] = useState('Anonymous');
  const [activeChannel, setActiveChannel] = useState('general');
  const [messages, setMessages] = useState({
    general: {
      msgs: [],
      unread : false,
    },
  })

  useEffect(() => {
    //set random username
    setUsername(`${usernames[Math.floor(Math.random() * usernames.length)]}`);
    threadIdCounter.current = Math.floor(Math.random() * 10000);

    let socket = socketIOClient(endpoint + workspace, { path : '/sockets/'} );
    clientSocket.current = socket;

    socket.on('message', (obj) => handleIncomingMessage(obj))
    socket.on('connected', () => console.log(`Connected to server! - id: ${socket.id}`));
  }, [])

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
      <Columns>
        <Sidebar>
          <SidebarList list={channels} heading="Channels" action="+" />
          <SidebarList list={members} heading="Users" action="+" />
        </Sidebar>
        <div className="column is-9 thread-body">
          <ThreadHeader heading={'Pesto'} />
          <ThreadHeader heading={`#${activeChannel} -- user: ${username}`} actions={headerActions} />
          {console.log(messages[activeChannel])}
          {messages[activeChannel].msgs.map(message => <ThreadMessage {...message} />)}
          <ThreadForm onClick={handleSend} />

        </div>
      </Columns>
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
