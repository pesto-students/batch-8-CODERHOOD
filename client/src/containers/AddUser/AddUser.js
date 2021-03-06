/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { InputField } from '../../components';
import callApi from '../../libs/axios';
import cn from 'classnames';
import { modules, methods } from '../../constants/constants';
import { useAppContext } from '../App/AppContext';

const AddUser = (props) => {
  const [userEmail, setUserEmail] = useState(undefined);
  const [userName, setUserName] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const { loginStatus } = useAppContext();

  const handleUserEmailChange = (e) => {
    setUserEmail(e.target.value);
  };
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  const inviteUser = async () => {
    setLoading(true);
    const { post } = methods;
    const { invitation } = modules;
    const response = await callApi(post, `/${invitation}`, {
      name: userName,
      email: userEmail,
      workspace: props.workspaceId,
      type: 'WorkspaceInvite',
      user: loginStatus.user._id
    });
    console.log({ response });
    props.onClose();
  };

  const className = cn('button is-black is-outlined', isLoading ? 'is-loading' : '');

  return (
    <div>
      <InputField
        label="Name"
        name="userName"
        onChange={handleUserNameChange}
      />
      <InputField
        label="User Email"
        name="userEmail"
        onChange={handleUserEmailChange}
      />
      <button className={className} onClick={inviteUser}>
        Invite User
      </button>
    </div>
  );
};

export default AddUser;
