import React from 'react';
import cn from 'classnames';

const Sidebar = ({width = 3, ...props}) => {
  const className = cn(
    "column",
    (width && `is-${width}`) 
  )
  return (
    <div className={className} {...props}>
      {props.children}
    </div>
  );
};

export default Sidebar;