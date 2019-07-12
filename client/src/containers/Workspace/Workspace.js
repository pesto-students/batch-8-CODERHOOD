import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container/Container';
import Columns from '../../components/Columns/Columns';
import InputField from '../../components/InputField/InputField';
import SidebarList from '../../components/SidebarList/SidebarList';
import getUser from '../../libs/getUser';
import callApi from '../../libs/axios';

const Workspace = ({userName, ...props}) => {
  const [ownedWS, setOwnedWS] = useState([]);
  const [ joinedWS, setJoinedWS] = useState([]);

  const ownedWorkspaces = ownedWS.map(workspace => (
    <a key={workspace._id} href="/thread">{workspace.name}</a>
  ))

  const joinedWorkspaces = joinedWS.map(workspace => (
    <a key={workspace._id} href="/thread">{workspace.name}</a>
  ))

  const pendingWorkspaces = [
    <span><a href="/">Pending first</a>&nbsp;&nbsp;<i className="has-text-primary fas fa-check"></i>&nbsp;&nbsp;<i className="has-text-danger fas fa-times"></i></span>,
    <span><a href="/">Pending second</a>&nbsp;&nbsp;<i className="has-text-primary fas fa-check"></i>&nbsp;&nbsp;<i className="has-text-danger fas fa-times"></i></span>,
  ];

  const fetchOwnedWS = async () => {
    callApi('post', '/workspace/all', {user: user._id})
      .then((result) => {
        const { data } = result.data.Data;
        setOwnedWS(data);
    });
  }

  const fetchJoinedWS = async () => {
    callApi('post', '/workspace/all', {members: user._id})
      .then((result) => {
        const { data } = result.data.Data;
        setJoinedWS(data);
    });
  }

  useEffect(() => {
    fetchOwnedWS();
    fetchJoinedWS();
  }, []);

  const user = getUser();

  return (
    <Container>
      <div className="level content">
        <div className="level-left">
          <h1 className="level-item">Welcome, {user.name}</h1>
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
        action={<Link to="/workspace/add"><i className="fas fa-plus"></i></Link>} />

      <SidebarList
        heading="Joined Workspaces"
        list={joinedWorkspaces} />

      <SidebarList
        heading="Pending Invitations"
        list={pendingWorkspaces} />

      <Columns>
      </Columns>
    </Container>
  )
}

export default Workspace;