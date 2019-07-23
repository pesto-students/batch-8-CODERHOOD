/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { modules, methods, endpoints } from "../../constants/constants";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/Spinner/Spinner";
import callApi from "../../libs/axios";
import { fetchMembersData } from "../../containers/Workspace/utils";
import { useAppContext } from "../../containers/App/AppContext";
import AddMember from "./AddMember";
import isEqual from "lodash-es/isEqual";
import uniq from "lodash-es/uniq";

const ChannelMembers = props => {
  const { channel } = modules;
  const { get, put } = methods;
  const { member } = endpoints;
  const [trigger, setTrigger] = useState(0);
  const channelDetails = useFetch(
    get,
    `/${channel}/${props.channelId}`,
    {},
    trigger
  );
  const [members, setMembers] = useState([]);
  const { isLoading } = channelDetails;
  const { loginStatus } = useAppContext();
  if (isLoading) {
    return <Spinner />;
  }
  const memberIds = members.map(member => member._id);
  if (
    !isEqual(
      uniq(memberIds).sort(),
      uniq(channelDetails.response.data.members).sort()
    )
  ) {
    fetchMembersData(channelDetails.response.data.members).then(result => {
      setMembers(result);
    });
  }
  const updateMember = async (memberDetails, operation = "add") => {
    await callApi(put, `/${channel}/${member}`, {
      operation: operation,
      id: props.channelId,
      memberId: memberDetails._id
    });
    setTrigger(trigger + 1);
  };
  return (
    <nav className="panel">
      <div className="panel-heading">
        {channelDetails.response.data.name}
        <a
          className="is-small is-size-7 is-vcentered"
          style={{ padding: "8px" }}
          onClick={() => {
            updateMember(
              loginStatus.user,
              channelDetails.response.data.members.includes(
                loginStatus.user._id
              )
                ? "delete"
                : "add"
            );
          }}
        >
          {channelDetails.response.data.members.includes(loginStatus.user._id)
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
              {channelDetails.response.data.user === loginStatus.user._id ? (
                <button
                  className="button is-outlined is-pulled-right is-small"
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
      {channelDetails.response.data.members.includes(loginStatus.user._id) ? (
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
