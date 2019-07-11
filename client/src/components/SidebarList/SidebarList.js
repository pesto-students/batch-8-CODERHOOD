import React from 'react';
import './SidebarList.css';

const SidebarList = ({heading, action, headingTag = 'h4', list = [], ...props}) => {
  const HTag = headingTag;
  const actionContent = action ? <span>{action}</span> : '';
  const headingContent = heading 
    ? <HTag>{heading} {actionContent}</HTag> 
    : <HTag>{actionContent}</HTag>;

  return (
    <div className="content">
      {headingContent}
      <ul {...props}>
        {list.map(ListItem => <li key={ListItem}>{ListItem}</li> )}
      </ul>
    </div>
  );
};

export default SidebarList;