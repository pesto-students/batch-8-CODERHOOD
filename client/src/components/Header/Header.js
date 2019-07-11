import React from "react";
import "./Header.css";
import InputField from "../InputField/InputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus, faPen } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";

const header = props => {
  return (
    <div className="header-container">
      <div className="channel-info">
        <h1 className="header-item">{props.workspaceName} </h1>
        <FontAwesomeIcon icon={faUser} size="xs" /> 9
        <span className="separator">|</span>
        <FontAwesomeIcon icon={faUserPlus} size="xs" />
        <span className="separator">|</span>
        <FontAwesomeIcon icon={faPen} size="xs" />
        <Button size="small">New Thread</Button>
      </div>
      <div className="header-item" />
      <div className="header-item search-container">
        <InputField placeholder="Search" hasLabel={false} />
      </div>
    </div>
  );
};

export default header;
