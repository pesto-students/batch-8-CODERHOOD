import React, { useState, useEffect } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Modal } from 'react-bulma-components';

import InputField from '../../components/InputField/InputField';
import { handleBlur, handleChange } from '../../libs/handleInputEvents';
import {
  getError,
  hasError,
  isTouched,
  handleErrors
} from '../../libs/validate';
import schema from './AddWorkspaceSchema';

function AddWorkspaceModal({ onClose, ...props }) {
  const [workspaceDetails, setWorkspaceDetails] = useState({
    workspaceName: undefined,
    invites: []
  });
  const [touched, setTouched] = useState({});
  const [error, setError] = useState({});

  useEffect(() => handleErrors(schema, workspaceDetails, setError), [
    workspaceDetails
  ]);

  const handleSubmit = 'TODO';

  return (
    <Modal {...props}>
      <Modal.Card>
        <Modal.Card.Head onClose={onClose}>
          <Modal.Card.Title>Add New Workspace</Modal.Card.Title>
        </Modal.Card.Head>
        <Modal.Card.Body {...props.modal}>
          <InputField
            label="Workspace Name"
            id="workspaceName"
            placeholder="Enter a name for your workspace"
            onChange={handleChange(
              setWorkspaceDetails,
              workspaceDetails,
              'workspaceName'
            )}
            onBlur={handleBlur(setTouched, touched, 'workspaceName')}
            error={
              error.workspaceName
                ? getError('workspaceName', touched, error)
                : null
            }
            value={workspaceDetails.workspaceName}
          />
          <button
            className="button is-primary"
            disabled={hasError(error) || !isTouched(touched)}
            onClick={handleSubmit}
          >
            Create Workspace
          </button>
        </Modal.Card.Body>
      </Modal.Card>
    </Modal>
  );
}

export default AddWorkspaceModal;
