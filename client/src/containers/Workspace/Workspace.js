import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container/Container';
import Columns from '../../components/Columns/Columns';
import InputField from '../../components/InputField/InputField';
import SidebarList from '../../components/SidebarList/SidebarList';
import getUser from '../../libs/getUser';
import callApi from '../../libs/axios';
import { Spinner } from '../../components';

const Workspace = ({userName, ...props}) => {
  const [ownedWS, setOwnedWS] = useState([]);
  const [ joinedWS, setJoinedWS] = useState([]);
  const [ isLoading, setLoading ] = useState(true);

  const ownedWorkspaces = ownedWS.map(workspace => (
    <Link key={workspace._id} to={`/thread/${workspace._id}`}>{workspace.name}</Link>
  ))

  const joinedWorkspaces = joinedWS.map(workspace => (
    <Link key={workspace._id} to={`/thread/${workspace._id}`}>{workspace.name}</Link>
  ))

  const pendingWorkspaces = [
    <span><a href="/">Pending first</a>&nbsp;&nbsp;<i className="has-text-primary fas fa-check"></i>&nbsp;&nbsp;<i className="has-text-danger fas fa-times"></i></span>,
    <span><a href="/">Pending second</a>&nbsp;&nbsp;<i className="has-text-primary fas fa-check"></i>&nbsp;&nbsp;<i className="has-text-danger fas fa-times"></i></span>,
  ];

  const fetchOwnedWS = async () => {
    const result = await callApi('post', '/workspace/all', {user: user._id}); 
    const { data } = result.data.Data;
    setOwnedWS(data);
  }

  const fetchJoinedWS = async () => {
    const result  = await callApi('post', '/workspace/all', {members: user._id})
    const { data } = result.data.Data;
    setJoinedWS(data);
  }

  useEffect(() => {
    fetchOwnedWS();
    fetchJoinedWS();
    setLoading(false);
  }, []);

  const user = getUser();
  console.log(isLoading);

  const renderWorkSpaces = () => {
    if (isLoading) {
      return <Spinner />
    }

    return (
      <>
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
      </>
    )
  }

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
      {renderWorkSpaces()}
      <Columns>
      </Columns>
    </Container>
  )
}

export default Workspace;