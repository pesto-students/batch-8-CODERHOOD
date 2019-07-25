/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { InputField } from '../../components';
import AddMember from '../ChannelMembers/AddMember';
import callApi from '../../libs/axios';
import { modules, methods } from '../../constants/constants';
import { useAppContext } from '../App/AppContext';

const AddChannel = (props) => {
  const [members, setMembers] = useState([]);
  const [channelName, setChannelName] = useState('');
  const { loginStatus } = useAppContext();

  const updateMember = (member) => {
    if (member !== undefined) {
      setMembers([...members, member]);
    }
  };

  const removeMember = (member) => {};
  const handleChannelNameChange = (e) => {
    setChannelName(e.target.value);
  };
  const createChannel = async () => {
    const { post } = methods;
    const { channel } = modules;
    await callApi(post, `/${channel}/`, {
      name: channelName,
      workspace: props.workspaceId,
      members: members.map((member) => member._id),
      isPrivate: false,
      user: loginStatus.user._id
    });
    props.onClose();
  };

  return (
    <div>
      <InputField
        label="Channel Name"
        name="channelName"
        value={channelName}
        onChange={handleChannelNameChange}
      />
      <div style={{ marginBottom: '0.8em' }}>
        <strong>Add People</strong>
      </div>
      <AddMember members={props.members} handleAdd={updateMember} />
      <br />
      {members.length > 0 ? (
        <div>
          <strong>People</strong>
        </div>
      ) : null}
      <div className="list is-hoverable">
        {members.map((member) => (
          <div
            className="list-item"
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <div>{member.name}</div>
            <div
              className="delete"
              onClick={() => {
                setMembers(
                  members.filter(
                    (removedMember) => member._id !== removedMember._id
                  )
                );
              }}
              style={{ marginRight: '2%' }}
            />
          </div>
        ))}
      </div>
      <button className="button is-outlined is-black" onClick={createChannel}>
        Create Channel
      </button>
    </div>
  );
};

export default AddChannel;
