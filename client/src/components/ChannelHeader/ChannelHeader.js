import React from 'react';

const ChannelHeader = ({
  heading,
  actions = [],
  handleViewMembers,
  handleDeleteChannel,
  isAuthorized,
  ...props
}) => {
  return (
    <div className="has-bottom-border-2">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h5>{heading}</h5>
        {isAuthorized ? (
          <button
            className="button is-small is-dark is-outlined"
            style={{ marginLeft: '0.8em' }}
            onClick={() => {
              handleViewMembers();
            }}
          >
            ) : null}
            {!props.isUser ? 'View Members' : 'View Profile'}
          </button>
        ) : null}
        {isAuthorized && heading !== '#General' ? (
          <button
            className="button is-pulled-right is-small is-dark is-outlined"
            style={{ marginLeft: '0.8em' }}
            onClick={() => {
              handleDeleteChannel();
            }}
          >
            Delete Channel
            {/* {!props.isUser ? 'View Members' : 'View Profile'} */}
          </button>
        ) : null}
        <div
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          onClick={props.burgerHandler}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </div>
      </div>
      <div className="level level-right">
        {actions.map((action, index) => (
          <span key={index} className="level-item">
            {action}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ChannelHeader;
