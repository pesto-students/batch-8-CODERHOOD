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
  return (
    <NavLink
      to={`/workspaces/${workspace}/${id}/${content}`}
      activeClassName={'tab--selected'}
      onClick={() => onClick(id, content, isUser)}
      {...props}
    >
      {isUser ? content : `#${content}`}
    </NavLink>
  );
};

export default SideTab;
