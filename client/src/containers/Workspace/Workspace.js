import React from 'react';
import Container from '../../components/Container/Container';
import Columns from '../../components/Columns/Columns';
import InputField from '../../components/InputField/InputField';
import SidebarList from '../../components/SidebarList/SidebarList';

const Workspace = ({userName, ...props}) => {
  const ownedWorkspaces = [
    <a href="/">Tomato Enthusiasts</a>,
    <a href="/">Plausible Conspiracy - Theories</a>,
  ];
  const pendingWorkspaces = [
    <span><a href="/">Pending first</a>&nbsp;&nbsp;<i className="has-text-primary fas fa-check"></i>&nbsp;&nbsp;<i className="has-text-danger fas fa-times"></i></span>,
    <span><a href="/">Pending second</a>&nbsp;&nbsp;<i className="has-text-primary fas fa-check"></i>&nbsp;&nbsp;<i className="has-text-danger fas fa-times"></i></span>,
  ];
  return (
    <Container>
      <div className="level content">
        <div className="level-left">
          <h1 className="level-item">Welcome, John</h1>
        </div>
        <div className="level-right">
          <form className="level-item">
            <InputField 
              className="is-primary is-rounded" 
              placeholder="Search Workspace" 
            />
          </form>
        </div>
      </div>

      <SidebarList 
        heading="Owned Workspaces" 
        list={ownedWorkspaces} 
        action={<i className="fas fa-plus"></i>} />

      <SidebarList
        heading="Joined Workspaces"
        list={ownedWorkspaces} />

      <SidebarList
        heading="Pending Invitations"
        list={pendingWorkspaces} />

      <Columns>
      </Columns>
    </Container>
  )
}

export default Workspace;