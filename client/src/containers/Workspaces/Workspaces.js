import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { useAppContext } from '../App/AppContext';
import { modules, methods, endpoints } from '../../constants/constants';
import Container from '../../components/Container/Container';
import Profile from '../Profile/Profile';
import InputField from '../../components/InputField/InputField';
import SidebarList from '../../components/SidebarList/SidebarList';
import Spinner from '../../components/Spinner/Spinner';
import AddWorkspaceModal from './AddWorkspace';
import NavBar from '../../components/NavBar/NavBar'

const Workspaces = (props) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [profileModalVisibility, setProfileModalVisibility] = useState(false);

  const user = useAppContext();
  const { dispatch } = useAppContext();

  const { post } = methods;
  const { workspace } = modules;
  const { getAll } = endpoints;
  const { _id } = user.loginStatus.user;

  const fetchOwnedWorkspaces = useFetch(post, `/${workspace}/${getAll}`, {
    user: _id,
  });

  const fetchJoinedWorkspaces = useFetch(post, `/${workspace}/${getAll}`, {
    members: _id,
    user: { '$ne': _id },
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
  const closeProfileModal = () => { setProfileModalVisibility(false); };


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
          actionClicked={createWorkspaceSubmit}
          action={<i 
            className="fa fa-plus-circle" 
            onClick={showModal}></i>}
        />
        <SidebarList
          heading="Joined Workspaces"
          list={joinedWorkspaces}
        />
      </>
    )
  }

  const createWorkspaceSubmit = () => {};

  const { name } = user.loginStatus.user;

  const viewProfileHandler = () => {
    setProfileModalVisibility(true);
  }

  const logoutHandler = () => {
    const { history } = props;
    dispatch({ type: 'logout' });
    localStorage.removeItem('user');
    history.push('/signin');
  }

  return (
    <div>
      <NavBar navItems={[{ name: "View Profile", handler: viewProfileHandler }, { name: "Logout", handler: logoutHandler }]} />
      <Container>
        <div className="level content">
          <div className="level-left">
            <h1 className="level-item">Welcome, {name}</h1>
          </div>
        </div>
        {renderWorkSpaces()}
        <AddWorkspaceModal
          show={modalVisibility}
          showClose={false}
          onClose={closeModal}
          modal={{ closeOnEsc: true }}
          {...props}
        />
        <Profile show={profileModalVisibility}
          showClose={false}
          onClose={closeProfileModal}
          modal={{ closeOnEsc: true }}
        />
      </Container>

    </div>

  )
}

export default Workspaces;