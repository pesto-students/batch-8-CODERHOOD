import React from 'react';

const ChannelHeader = ({heading, actions = [], ...props}) => {
  return (
    <div className="level has-bottom-border-2">
      <div className="level-left">
        <h3>{heading}</h3>
      </div>
      <div className="level level-right">
        {actions.map((action, index) => <span key={index} className="level-item">{action}</span>)}
      </div>
    </div>
  )
}

export default ChannelHeader;