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
  ...props
}) => {
  const channelType = isUser ? 'usr' : 'ch';
  const unreadClass = unread ? 'unread' : '';
  // console.log('in Sidebar unread:: ', unread);
  return (
    <NavLink
      to={`/workspaces/${workspace}/${id}/${channelType}/${content}`}
      activeClassName={'tab--selected'}
      onClick={() => onClick(id, content, isUser)}
      {...props}
    >
      <span className={unreadClass}>
        {isUser ? content : `#${content}`}
      </span>
    </NavLink>
  );
};

export default SideTab;
