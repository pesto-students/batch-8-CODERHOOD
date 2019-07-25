import React from 'react';
import cn from 'classnames';
import './Sidebar.css';

const Sidebar = ({ width = 2, ...props }) => {
  const className = cn('column', width && `is-${width}`);
  return (
    <div className={className} {...props}>
      {props.children}
    </div>
  );
};

export default Sidebar;
