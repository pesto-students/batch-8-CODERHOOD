import React from "react";
import "./Header.css";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";

const header = props => {
  const addUser = () => {};

  const viewUsers = () => {};

  const startNewThread = () => {};

  return (
    <div className="header-container columns">
      <div className="channel-info column ">
        <h1>{props.channelName} </h1>
        <span className="clickable-icon" onClick={viewUsers}>
          <i className="fa fa-user fa-sm" />
          <span> {props.memberCount}</span>
        </span>
        <span className="separator">|</span>
        <span className="clickable-icon" onClick={addUser}>
          <i className="fa fa-user-plus fa-sm" />
        </span>
        <span className="separator">|</span>
        <Button
          style={{ border: "none", padding: 0, background: "transparent" }}
          size="small"
          onClick={startNewThread}
        >
          New Thread
        </Button>
      </div>
      <div className="search-container is-vcentered column">
        <div className="control has-icons-left">
          <InputField className="inputField" type="text" placeholder="Search" />
          <span className="icon is-small is-left">
            <i className="fa fa-search" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default header;
