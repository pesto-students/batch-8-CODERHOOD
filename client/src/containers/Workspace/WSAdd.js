import React, { useState, useEffect } from 'react';
import Container from '../../components/Container/Container';
import InputField from '../../components/InputField/InputField';
import { getError, hasError, isTouched } from '../../libs/validate';
import handleErrors from './WorkspaceAddSchema';
import callApi from '../../libs/axios';
import getUser from '../../libs/getUser';


function WorkspaceAdd(props) {
  const [workspaceDetails, setWorkspaceName] = useState({ workspaceName: '', members: [] });
  const [users, setUsers] = useState([]);
  const [touched, setTouched] = useState({});
  const [error, setError] = useState({});

  const fetchUsers = async () => {
    const result = await callApi('get', '/user');
    const { data } = result.data.Data;
    const currentUser = getUser();
    const filteredUsers = data.filter(user => user._id !== currentUser._id);
    setUsers(filteredUsers);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const touchedFields = {}

  const handleNameChange = field => event => {
    setWorkspaceName({ ...workspaceDetails, [field]: event.target.value });
    handleErrors(workspaceDetails, setError);
  }

  const handleBlur = (field) => (event) => {
    handleErrors(workspaceDetails, setError);
    touchedFields[field] = true;
    setTouched({ ...touched, ...touchedFields })
  }

  return (
    <Container>
      <div className="columns is-centered content">
        <div className="column is-full-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
          <h2>Add New Workspace</h2>

          <InputField
            label="Workspace Name"
            id="workspaceName"
            onChange={handleNameChange('workspaceName')}
            onBlur={handleBlur('workspaceName')}
            error={error.workspaceName ? getError('workspaceName', touched, error) : null}
            value={workspaceDetails.workspaceName}
          />

          <div className="field">
            <div className="control has-text-centered">
              <button
                className="button is-primary"
                disabled={hasError(error) || !isTouched(touched)}
              // onClick={handleSubmit}
              >Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default WorkspaceAdd;