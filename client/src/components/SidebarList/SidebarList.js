import React from 'react';
import './SidebarList.css';

const SidebarList = ({
  heading,
  action,
  headingTag = 'h4',
  list = [],
  actionClicked,
  ...props
}) => {
  const HTag = headingTag;
  const actionContent = action ? (
    <span
      style={{ cursor: 'pointer' }}
      onClick={() => {
        actionClicked();
      }}
    >
      {action}
    </span>
  ) : (
    ''
  );
  const headingContent = heading ? (
    <HTag style={{ color: 'white', paddingLeft: '1em' }}>
      {heading} {actionContent}
    </HTag>
  ) : (
    <HTag>{actionContent}</HTag>
  );

  return (
    <div className="content">
      <div className="menu-label is-small">{headingContent}</div>
      <ul className="menu-list" {...props} style={{ color: 'white' }}>
        {list.map((listItem, index) => (
          <li
            style={{ whiteSpace: 'nowrap', listStyle: 'none' }}
            key={`${listItem.toString()}-${index}`}
          >
            {listItem}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarList;
