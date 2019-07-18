import React, { useRef } from 'react';

import './SelectableItem.css';

const SelectableItem = (props) => {
  const { handleChange, content } = props;

  const itemRef = useRef(null);

  const handleToggle = (e) => {
    const itemElement = itemRef.current;
    itemElement.classList.toggle('item--selected');
    if (handleChange) {
      handleChange();
    }
  };

  return (
    <div ref={itemRef} className="box item">
      <input type="checkbox" onChange={handleToggle} />
      <span className="item__content">{content}</span>
    </div>
  );
};

export default SelectableItem;
