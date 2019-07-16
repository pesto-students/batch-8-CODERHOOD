import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Container from '../../components/Container/Container';
import Columns from '../../components/Columns/Columns';
import InputField from '../../components/InputField/InputField';
import SidebarList from '../../components/SidebarList/SidebarList';
import Spinner  from '../../components/Spinner/Spinner';
 

const Workspaces = () => {
  const [ownedWS, setOwnedWS] = useState([]);
  const [ joinedWS, setJoinedWS] = useState([]);
  const [ isLoading, setLoading ] = useState(true);

  const ownedWorkspaces = ownedWS.map(workspace => (
    <Link key={workspace._id} to={`/workspaces/${workspace._id}`}>{workspace.name}</Link>
  ))

  const joinedWorkspaces = joinedWS.map(workspace => (
    <Link key={workspace._id} to={`/workspaces/${workspace._id}`}>{workspace.name}</Link>
  ))

  useEffect(() => {
    // TODO: fetch workspaces list
    const dummyWorkspaces = [
      {
        _id: 1,
        name: 'Workspace 1'
      },
      {
        _id: 2,
        name: 'Workspace 2'
      }
    ]
    setOwnedWS(dummyWorkspaces);
    setJoinedWS(dummyWorkspaces);
    setLoading(false);
  }, []);

  const dummyUser = {
    _id: 101010,
    name: 'John',
  }
  // TODO: Get user data
  const user = dummyUser;

  const renderWorkSpaces = () => {
    if (isLoading) {
      return <Spinner />
    }

    return (
      <>
        <SidebarList 
          heading="Owned Workspaces" 
          list={ownedWorkspaces} 
          action={<Link to="/workspaces/add"><i className="fas fa-plus"></i></Link>}
        />
        <SidebarList
          heading="Joined Workspaces"
          list={joinedWorkspaces}
        />
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

export default Workspaces;