import React from 'react';
import './SidebarList.css';

const SidebarList = ({ heading, action, headingTag = 'h4', list = [], actionClicked = () => {}, ...props }) => {
  const HTag = headingTag;
  const actionContent = action ? <span onClick={() => { actionClicked() }}>{action}</span> : '';
  const headingContent = heading
    ? <HTag>{heading} {actionContent}</HTag>
    : <HTag>{actionContent}</HTag>;

  return (
    <div className="content">
      {headingContent}
      <ul {...props}>
        {list.map((listItem, index) => <li key={`${listItem.toString()}-${index}`}>{listItem}</li>)}
      </ul>
    </div>
  );
};

export default SidebarList;