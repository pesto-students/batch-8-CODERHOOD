import React, { useState, useEffect } from 'react';
import Container from '../../components/Container/Container';
import InputField from '../../components/InputField/InputField';
import callApi from '../../libs/axios';
import { getError, hasError, isTouched } from '../../libs/validate';
import handleErrors from './WorkspaceAddSchema';


function WorkspaceAdd (props) {
  const [ users, setUsers ] = useState([]);
  const [ members, setMembers ] = useState([]);
  const [ workspaceName, setWorkspaceName ] = useState('');
  const [touched, setTouched] = useState({});
  const [error, setError] = useState({});

  const touchedFields = {}

  useEffect(() => {
    callApi('get', '/user')
    .then(result => {
      const { Data } = result.data;
      setUsers(Data.data);
    })
    .catch('unable to fetch users');
  }, []);

  const handleNameChange = field => event => {
    setWorkspaceName(event.target.value);
    handleErrors(workspaceName, setError);
  }
  const handleChange = field => event => {
    const options = event.target.options;
    const selectedUsers = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selectedUsers.push(options[i].value);
      }
    }
    setMembers(selectedUsers)
    handleErrors(users, setError);
  }

  const handleBlur = (field) => (event) => {
    handleErrors(users, setError);
    touchedFields[field] = true;
    setTouched({ ...touched, ...touchedFields })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      name: workspaceName,
      members: members,
    });
    // const result = await callApi('post', '/workspace', { 
    //   name: workspaceName, 
    //   members: users, 
    // });
    // if (result.data) {
    //   console.log("FOrm Submitted");
    //   const { Data } = result.data;
    //   const user = JSON.stringify(Data);
    //   localStorage.setItem('user', user);
    //   // props.history.push('/');
    // } else {
    //   alert(result);
    // }
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
          />

          <div class="field">
            <label class="label">Users</label>
            <div class="control">
              <div class="select" style={{ width: '100%' }}>
                <select multiple 
                style={{ width: '100%' }}
                id="users"
                onChange={handleChange('users')}
                onBlur={handleBlur('users')}
                error={error.users ? getError('users', touched, error) : null}
              >
                  {users.map(user => <option value={user._id}>{user.name}</option>)}
                </select>
              </div>
            </div>
          </div>
          
          {/* FIXME: has some design issues */}
          <br /> <br /> <br /> <br /> <br />

          <div className="field">
            <div className="control has-text-centered">
              <button
                className="button is-primary"
                disabled={hasError(error) || !isTouched(touched)}
                onClick={handleSubmit}
              >Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default WorkspaceAdd;