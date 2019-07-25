import React from 'react';
import cn from 'classnames';
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

  const className = cn('menu-list', list.length > 4 ? 'sidebar__List' : '');
  return (
    <div className="content">
      <div className="menu-label is-small">{headingContent}</div>
      <ul className={className} {...props} style={{ color: 'white' }}>
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
