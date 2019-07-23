import React, { useState } from 'react';
import { Modal } from 'react-bulma-components';
import { useAppContext } from "../App/AppContext";
import { has, get } from 'lodash-es';
import { modules, methods } from '../../constants/constants';
import { InputField } from '../../components';

import callApi from "../../libs/axios";

function AddWorkspaceModal(props) {
  const { loginStatus } = useAppContext();
  // const [touched, setTouched] = useState({});
  const [workspaceName, setWorkspaceName] = useState(undefined);

  const handleWorkspaceNameChange = e => {
    setWorkspaceName(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { post } = methods;
    const { workspace, channel } = modules;
    
    const response = await callApi(post, `/${workspace}/`, {
      name: workspaceName,
      members: [],
      user: loginStatus.user._id
    });

    await callApi(post, `/${channel}`, {
      name: 'General',
      members: [loginStatus.user._id],
      workspace: response.data.data._id,
      user: loginStatus.user._id,
      isPrivate: false,
    });

    if (props && props.onClose) {
      props.onClose();
    }
    if (has(response, 'data.data._id')) {
      const workspaceId = get(response, 'data.data._id');
      props.history.push(`/workspaces/${workspaceId}`);
    }
  }

  return (
    <Modal {...props}>
      <Modal.Card>
        <Modal.Card.Head onClose={props.onClose}>
          <Modal.Card.Title>Add New Workspace</Modal.Card.Title>
        </Modal.Card.Head>
        <Modal.Card.Body {...props.modal}>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Workspace Name"
              id="workspaceName"
              placeholder="Enter a name for your workspace"
              onChange={handleWorkspaceNameChange}
              value={workspaceName}
            />
            <button className="button is-primary" type="submit">
              Create Workspace
            </button>
          </form>
        </Modal.Card.Body>
      </Modal.Card>
    </Modal>
  );
}

export default AddWorkspaceModal;
