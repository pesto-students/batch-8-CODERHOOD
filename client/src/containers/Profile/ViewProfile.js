/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import useFetch from "../../hooks/useFetch";
import { modules, methods } from "../../constants/constants";
import Spinner from "../../components/Spinner/Spinner";

const ViewProfile = props => {
  const { user } = modules;
  const { get } = methods;
  const memberDetails = useFetch(get, `/${user}/${props.userId}`, {});
  const { isLoading } = memberDetails;
  if (isLoading) {
    return <Spinner />;
  }
  const member = memberDetails.response.data;

  return (
    <div className="card" style={{ minHeight: "92vh" }}>
      <div className="panel-heading">
        {member.name}
        <button
          className="button is-outlined is-pulled-right is-small"
          onClick={() => {
            props.handleClose();
          }}
        >
          Close
        </button>
      </div>
      <div className="card-image has-text-centered">
        {/* <figure className="image is-3by2"> */}
        <img
          src={member.avatar}
          alt="Profile"
          style={{ borderRadius: "50%", marginTop: "1%", width: "10vw" }}
        />
        {/* </figure> */}
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src={member.avatar} alt="Profile" />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{member.name}</p>
            <p className="subtitle is-6">{member.email}</p>
          </div>
        </div>
        <div className="content">
          {member.bio} <a>{member.email}</a>.
          <br />
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
