import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { useAppContext } from '../App/AppContext';
import { modules, methods, endpoints } from '../../constants/constants';
import {
  Tile,
  Container,
  NavBar,
  SidebarList,
  Spinner,
  Grid
} from '../../components';
import AddWorkspaceModal from './AddWorkspace';
import Profile from '../Profile/Profile';
import './Workspaces.css';

const Workspaces = (props) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [profileModalVisibility, setProfileModalVisibility] = useState(false);
  const [activeTab, setActiveTab] = useState({ owned: true });

  const user = useAppContext();
  const { dispatch } = useAppContext();

  const { post } = methods;
  const { workspace } = modules;
  const { getAll } = endpoints;
  const { _id } = user.loginStatus.user;

  const fetchOwnedWorkspaces = useFetch(post, `/${workspace}/${getAll}`, {
    user: _id
  });

  const fetchJoinedWorkspaces = useFetch(post, `/${workspace}/${getAll}`, {
    members: _id,
    user: { $ne: _id }
  });

  const ownedWS = fetchOwnedWorkspaces.response
    ? fetchOwnedWorkspaces.response.data.data
    : [];

  const joinedWS = fetchJoinedWorkspaces.response
    ? fetchJoinedWorkspaces.response.data.data
    : [];

  const ownedWorkspaces = ownedWS.map((workspace) => (
    <Tile
      name={workspace.name}
      key={workspace._id}
      to={`/workspaces/${workspace._id}`}
    />
  ));

  const joinedWorkspaces = joinedWS.map((workspace) => (
    <Tile
      name={workspace.name}
      key={workspace._id}
      to={`/workspaces/${workspace._id}`}
    />
  ));

  const showModal = () => {
    setModalVisibility(true);
  };
  const closeModal = () => {
    setModalVisibility(false);
  };
  const closeProfileModal = () => {
    setProfileModalVisibility(false);
  };

  const toggleTab = (tab) => {
    setActiveTab({ ...tab });
  };

  const renderWorkSpaces = () => {
    const { isLoading: isOwnedWSLoading } = fetchOwnedWorkspaces;
    const { isLoading: isJoinedWSLoading } = fetchJoinedWorkspaces;
    if (isOwnedWSLoading || isJoinedWSLoading) {
      return <Spinner />;
    }

    return (
      <>
        {activeTab.owned ? (
          <Grid
            heading=""
            list={ownedWorkspaces}
            actionClicked={createWorkspaceSubmit}
            action={<i className="fa fa-plus fa-8x" onClick={showModal} />}
          />
        ) : (
          <Grid heading="" list={joinedWorkspaces} />
        )}
      </>
    );
  };

  const createWorkspaceSubmit = () => {};

  const { name } = user.loginStatus.user;

  const viewProfileHandler = () => {
    setProfileModalVisibility(true);
  };

  const logoutHandler = () => {
    const { history } = props;
    dispatch({ type: 'logout' });
    localStorage.removeItem('user');
    history.push('/signin');
  };

  return (
    <div>
      <NavBar
        navItems={[
          { name: 'View Profile', handler: viewProfileHandler },
          { name: 'Logout', handler: logoutHandler }
        ]}
      />
      <Container>
        <div className="welcome content">
          {/* <h1 className="level-item">Welcome, {name}</h1> */}
          <h3 className="level-item">Select your workspace</h3>
        </div>
        <div class="tabs is-centered is-large is-mobile is-medium ">
          <ul>
            <li
              className={activeTab.owned ? 'is-active' : ''}
              onClick={() => toggleTab({ owned: true })}
            >
              <a className="tab__item">Owned ({ownedWorkspaces.length})</a>
            </li>
            <li
              className={activeTab.owned ? '' : 'is-active'}
              onClick={() => toggleTab({ owned: false })}
            >
              <a className="tab__item">Joined ({joinedWorkspaces.length})</a>
            </li>
          </ul>
        </div>
        {renderWorkSpaces()}
        <AddWorkspaceModal
          show={modalVisibility}
          showClose={false}
          onClose={closeModal}
          modal={{ closeOnEsc: true }}
          {...props}
        />
        <Profile
          show={profileModalVisibility}
          showClose={false}
          onClose={closeProfileModal}
          modal={{ closeOnEsc: true }}
        />
      </Container>
    </div>
  );
};

export default Workspaces;
