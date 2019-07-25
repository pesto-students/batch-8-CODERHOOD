/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import {
  modules,
  methods,
  endpoints,
  userJoiningEvent,
  userLeavingEvent
} from '../../constants/constants';
import callApi from '../../libs/axios';
import { fetchMembersData } from '../../containers/Workspace/utils';
import { useAppContext } from '../../containers/App/AppContext';
import AddMember from './AddMember';
import isEqual from 'lodash-es/isEqual';
import uniq from 'lodash-es/uniq';

const ChannelMembers = (props) => {
  const { channel } = modules;
  const { member } = endpoints;
  const [trigger, setTrigger] = useState(0);
  const [members, setMembers] = useState([]);
  const { loginStatus } = useAppContext();

  const channelDetails = props.channels.filter(
    ({ _id }) => _id === props.channelId
  )[0];

  const memberIds = members.map((member) => member._id);
  if (!isEqual(uniq(memberIds).sort(), uniq(channelDetails.members).sort())) {
    fetchMembersData(channelDetails.members).then((result) => {
      setMembers(result);
    });
  }

  const updateMember = (memberDetails, operation = 'add') => {
    if (memberDetails !== undefined && memberDetails._id !== undefined) {
      callApi('put', `/${channel}/${member}`, {
        operation: operation,
        id: props.channelId,
        memberId: memberDetails._id
      });
      const notificationObject = {
        user: memberDetails.name,
        userId: memberDetails._id,
        channelId: channelDetails._id
      };
      if (operation === 'add') {
        props.socket.emit(userJoiningEvent, notificationObject);
      } else {
        props.socket.emit(userLeavingEvent, notificationObject);
      }
      setTrigger(trigger + 1);
    }
  };
  return (
    <nav className="panel">
      <div className="panel-heading">
        #{channelDetails.name}
        {channelDetails.user !== loginStatus.user._id ? (
          <a
            className="is-small is-size-7 is-vcentered"
            style={{ padding: '8px' }}
            onClick={() => {
              updateMember(
                loginStatus.user,
                channelDetails.members.includes(loginStatus.user._id)
                  ? 'delete'
                  : 'add'
              );
            }}
          >
            {channelDetails.members.includes(loginStatus.user._id)
              ? `Leave Channel`
              : `Join Channel`}
          </a>
        ) : null}
        <button
          className="button is-outlined is-pulled-right is-small"
          onClick={() => {
            props.handleClose();
          }}
        >
          Close
        </button>
      </div>
      <div
        className="panel-block"
        style={{ padding: '0px', paddingRight: '0px' }}
      >
        <div
          class="list"
          style={{
            width: '100%',
            boxShadow: 'none'
          }}
        >
          {members.map((member) => (
            <div className="list-item" style={{ lineHeight: '2em' }}>
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    width: '4vh',
                    height: '4vh',
                    marginRight: '0.5vw',
                    position: 'relative',
                    bottom: '-0.5vh'
                  }}
                >
                  <img src={member.avatar} alt={member.name} />
                </div>
                <div>{member.name}</div>
                <div style={{ flexGrow: 2 }}>
                  {channelDetails.user === loginStatus.user._id &&
                  member._id !== loginStatus.user._id ? (
                    <button
                      className="button is-outlined is-pulled-right is-small is-danger"
                      onClick={() => {
                        updateMember(member, 'delete');
                      }}
                    >
                      Remove Member
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {channelDetails.members.includes(loginStatus.user._id) ? (
        <div className="panel-block">
          <AddMember
            members={props.workspaceMembers}
            handleAdd={updateMember}
          />
        </div>
      ) : null}
    </nav>
  );
};

export default ChannelMembers;
