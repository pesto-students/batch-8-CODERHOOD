import React from "react";
import Container from '../../components/Container/Container';
import Sidebar from '../../components/Sidebar/Sidebar';
import Columns from '../../components/Columns/Columns';
import SidebarList from '../../components/SidebarList/SidebarList';
import ThreadHeader from '../../components/ThreadHeader/ThreadHeader';
import ThreadMessage from '../../components/ThreadMessage/ThreadMessage';
import ThreadForm from '../../components/ThreadForm/ThreadForm';
import './Thread.css';

function Thread() {
  // TODO: fill with real data later
  const members = [ 'User One', 'User Two' ];
  const channels = [ '#general', '#signin_signout' ]; 

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

  const messages = [{
    threadId: 123,
    userName: 'John Smith',
    userPic: 'https://bulma.io/images/placeholders/128x128.png',
    timeSince: '31m',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.',
    messageActions,
  },
  {
    threadId: 234,
    userName: 'Mr Anderson',
    userPic: 'https://dummyimage.com/64x64/000/fff&text=MrAnderson',
    timeSince: '28m',
    message: 'I know lorem ipsum.',
    messageActions,
  },
    {
      threadId: 234,
      userName: 'Mr Anderson',
      userPic: 'https://dummyimage.com/64x64/000/fff&text=MrAnderson',
      timeSince: '28m',
      message: 'I know lorem ipsum.',
      messageActions,
    }];

  return (
    <Container>
      <Columns>
        <Sidebar>
          <SidebarList list={channels} heading="Channels" action="+" />
          <SidebarList list={members} heading="Users" action="+" />
        </Sidebar>

        <div className="column is-9 thread-body">
          <ThreadHeader heading={headerTitle} actions={headerActions} />
          
          {messages.map(message => <ThreadMessage {...message} />)}

          <ThreadForm />

        </div>
      </Columns>
    </Container>
  );
}

export default Thread;
