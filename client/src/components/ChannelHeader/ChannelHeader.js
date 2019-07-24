import React from 'react';

const ChannelHeader = ({
  heading,
  actions = [],
  handleViewMembers,
  ...props
}) => {
  return (
    <div className="level has-bottom-border-2">
      <div className="level-left">
        <h5>{heading}</h5>
        <button
          className="button is-pulled-right is-small is-dark is-outlined"
          style={{ marginLeft: '0.8em' }}
          onClick={() => {
            handleViewMembers();
          }}
        >
          {!props.isUser ? 'View Members' : 'View Profile'}
        </button>
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
