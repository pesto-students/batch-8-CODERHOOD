/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import {
  modules,
  methods,
  endpoints,
  userJoiningEvent,
  userLeavingEvent
} from "../../constants/constants";
import callApi from "../../libs/axios";
import { fetchMembersData } from "../../containers/Workspace/utils";
import { useAppContext } from "../../containers/App/AppContext";
import AddMember from "./AddMember";
import isEqual from "lodash-es/isEqual";
import uniq from "lodash-es/uniq";

const ChannelMembers = props => {
  const { channel } = modules;
  const { member } = endpoints;
  const [trigger, setTrigger] = useState(0);
  const [members, setMembers] = useState([]);
  const { loginStatus } = useAppContext();

  const channelDetails = props.channels.filter(
    ({ _id }) => _id === props.channelId
  )[0];

  const memberIds = members.map(member => member._id);
  if (!isEqual(uniq(memberIds).sort(), uniq(channelDetails.members).sort())) {
    fetchMembersData(channelDetails.members).then(result => {
      setMembers(result);
    });
  }

  const updateMember = (memberDetails, operation = "add") => {
    callApi("put", `/${channel}/${member}`, {
      operation: operation,
      id: props.channelId,
      memberId: memberDetails._id
    });

    const notificationObject = {
      user: memberDetails.name,
      userId: memberDetails._id,
      channelId: channelDetails._id
    };
    if (operation === "add") {
      props.socket.emit(userJoiningEvent, notificationObject);
    } else {
      props.socket.emit(userLeavingEvent, notificationObject);
    }
    setTrigger(trigger + 1);
  };
  return (
    <nav className="panel">
      <div className="panel-heading">
        {channelDetails.name}
        <a
          className="is-small is-size-7 is-vcentered"
          style={{ padding: "8px" }}
          onClick={() => {
            updateMember(
              loginStatus.user,
              channelDetails.members.includes(loginStatus.user._id)
                ? "delete"
                : "add"
            );
          }}
        >
          {channelDetails.members.includes(loginStatus.user._id)
            ? `Leave Channel`
            : `Join Channel`}
        </a>
        <button
          className="button is-outlined is-pulled-right is-small"
          onClick={() => {
            props.handleClose();
          }}
        >
          Close
        </button>
      </div>
      <div className="panel-block">
        <div class="list" style={{ width: "100%" }}>
          {members.map(member => (
            <div className="list-item">
              <span className="icon is-size-7" style={{ padding: 10 }}>
                <i
                  className="fas fa-circle"
                  style={
                    member.isOnline ? { color: "green" } : { color: "gray" }
                  }
                />
              </span>
              {member.name}
              {channelDetails.user === loginStatus.user._id ? (
                <button
                  className="button is-outlined is-pulled-right is-small is-danger"
                  onClick={() => {
                    updateMember(member, "delete");
                  }}
                >
                  Remove Member
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      {channelDetails.members.includes(loginStatus.user._id) ? (
        <div className="panel-block" style={{ minHeight: "100vh" }}>
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
