import React from 'react';
import { NavLink } from 'react-router-dom';

import './SideTab.css';

const SideTab = ({
  cls,
  content,
  id,
  onClick,
  workspace,
  isUser = false,
  unread,
  avatar,
  ...props
}) => {
  const channelType = isUser ? 'usr' : 'ch';
  const unreadClass = unread ? 'unread' : '';
  // console.log('in Sidebar unread:: ', unread);
  const renderUser = () => {
    return (
      <div style={{ display: 'flex'}}>
        <div 
          style={{ 
            width: '4vh', 
            height: '4vh', 
            marginRight: '0.5vw',
            position: 'relative',
            bottom: '0.4vh',
          }}
        >
          <img 
            src={avatar} 
            alt={content} 
            // style={{ width: '2vw', height: '4vh' }}
          />
        </div>
        <div>
          {content}
        </div>
      </div>
    )
  }
  return (
    <NavLink
      to={`/workspaces/${workspace}/${id}/${channelType}/${content}`}
      activeClassName={'tab--selected'}
      onClick={() => onClick(id, content, isUser)}
      {...props}
      style={{color: '#cfbfcd'}}
    >
      <span className={unreadClass}>
        {isUser ? renderUser() : `#${content}`}
      </span>
    </NavLink>
  );
};

export default SideTab;
