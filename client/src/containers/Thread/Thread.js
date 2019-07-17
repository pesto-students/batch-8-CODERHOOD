import React, { useEffect } from "react";
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

  useEffect(() => {
    function updateMessageHeight() {
      try {
        const containerHeight = document.querySelector("#root > .section > .container").clientHeight;
        const viewPortHeight = window.innerHeight;
        const headerHeight = document.querySelector(".thread-body > .level").clientHeight;
        const viewPortDiff = containerHeight - viewPortHeight - headerHeight;
        const height = viewPortDiff - headerHeight;
        document.getElementById("messages").style.maxHeight = height + 'px';
      } catch (error) {
        console.log("error in height calculations");
      }
    }
    window.addEventListener('resize', updateMessageHeight);
    return () => {
      window.removeEventListener('resize', updateMessageHeight);
    }
  })

  return (
    <Container>
      <Columns>
        <Sidebar>
          <SidebarList list={channels} heading="Channels" action="+" />
          <SidebarList list={members} heading="Users" action="+" />
        </Sidebar>

        <div className="column is-9 thread-body">
          <ThreadHeader heading={headerTitle} actions={headerActions} />
          <div id="messages">
          {messages.map(message => <ThreadMessage {...message} />)}
          </div>

          <div className="fixed">
            <ThreadForm />
          </div>

        </div>
      </Columns>
    </Container>
  );
}

export default Thread;
