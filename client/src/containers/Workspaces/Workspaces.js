import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { useAppContext } from '../App/AppContext';
import { modules, methods, endpoints } from '../../constants/constants';

import Container from '../../components/Container/Container';
import InputField from '../../components/InputField/InputField';
import SidebarList from '../../components/SidebarList/SidebarList';
import Spinner from '../../components/Spinner/Spinner';
import AddWorkspaceModal from './AddWorkspace';

const Workspaces = () => {
  const [modalVisibility, setModalVisibility] = useState(false);

  const user = useAppContext();

  const { post } = methods;
  const { workspace } = modules;
  const { getAll } = endpoints;

  const fetchOwnedWorkspaces = useFetch(post, `/${workspace}/${getAll}`, {
    user: '5d296628efda5a73faa563cb',
  });

  const fetchJoinedWorkspaces = useFetch(post, `/${workspace}/${getAll}`, {
    members: '5d296628efda5a73faa563cb',
    user: { '$ne': '5d296628efda5a73faa563cb' },
  })

  const ownedWS = fetchOwnedWorkspaces.response
    ? fetchOwnedWorkspaces.response.data.data
    : [];

  const joinedWS = fetchJoinedWorkspaces.response
  ? fetchJoinedWorkspaces.response.data.data
  : [];
  
  const ownedWorkspaces = ownedWS.map(workspace => (
    <Link key={workspace._id} to={`/workspaces/${workspace._id}`}>{workspace.name}</Link>
  ))
  
  const joinedWorkspaces = joinedWS.map(workspace => (
    <Link key={workspace._id} to={`/workspaces/${workspace._id}`}>{workspace.name}</Link>
  ))

  const showModal = () => { setModalVisibility(true); };
  const closeModal = () => { setModalVisibility(false); };

  const renderWorkSpaces = () => {
    const { isLoading: isOwnedWSLoading } = fetchOwnedWorkspaces;
    const { isLoading: isJoinedWSLoading } = fetchJoinedWorkspaces;
    if (isOwnedWSLoading || isJoinedWSLoading) {
      return <Spinner />
    }

    return (
      <>
        <SidebarList
          heading="Owned Workspaces"
          list={ownedWorkspaces}
          action={<i className="fas fa-plus" onClick={showModal}></i>}
        />
        <SidebarList
          heading="Joined Workspaces"
          list={joinedWorkspaces}
        />
      </>
    )
  }

  const { name } = user.loginStatus.user;

  return (
    <Container>
      <div className="level content">
        <div className="level-left">
          <h1 className="level-item">Welcome, {name}</h1>
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
      <AddWorkspaceModal
        show={modalVisibility}
        showClose={false}
        onClose={closeModal}
        modal={{ closeOnEsc: true }}
      />
    </Container>
  )
}

export default Workspaces;