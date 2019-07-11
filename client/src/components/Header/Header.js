import React from "react";
import "./Header.css";
import InputField from "../InputField/InputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserPlus,
  faPen,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";

const header = props => {
  return (
    <div className="header-container">
      <div className="channel-info">
        <h1 className="header-item">{props.channelName} </h1>
        <FontAwesomeIcon icon={faUser} size="xs" /> {props.memberCount}
        <span className="separator">|</span>
        <FontAwesomeIcon icon={faUserPlus} size="xs" />
        <span className="separator">|</span>
        <FontAwesomeIcon icon={faPen} size="xs" />
        <span className="separator" />
        <Button size="small">New Thread</Button>
      </div>
      <div className="header-item" />
      <div className="header-item search-container">
        <div class="control has-icons-left">
          <InputField class="input " type="text" placeholder="Search" />
          <span class="icon is-small is-left">
            <FontAwesomeIcon icon={faSearch} size="xs" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default header;
