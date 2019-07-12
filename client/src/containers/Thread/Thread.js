import React from "react";
import { 
  Container, 
  Sidebar, 
  Columns, 
  SidebarList, 
  ThreadHeader, 
  ThreadMessage, 
  ThreadForm
} from '../../components';
import './Thread.css';

function Thread() {
  const members = [];
  const channels = []; 
  const headerTitle = "";
  const headerActions = [];
  const messages = [];

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
