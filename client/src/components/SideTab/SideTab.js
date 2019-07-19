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
  ...props
}) => {
  const channelType = isUser ? 'usr' : 'ch';
  return (
    <NavLink
      to={`/workspaces/${workspace}/${id}/${channelType}/${content}`}
      activeClassName={'tab--selected'}
      onClick={() => onClick(id, content, isUser)}
      {...props}
    >
      {isUser ? content : `#${content}`}
    </NavLink>
  );
};

export default SideTab;
