import React, { useState } from 'react';

import Container from '../Container/Container';
import './SelectableItem.css';

const SelectableItem = (props) => {
  const { handleChange, content, intialState } = props;

  return (
    <div className="box item">
      <input
        type="checkbox"
        defaultChecked={intialState}
        onChange={handleChange}
      />
      <span className="item__content">{content}</span>
    </div>
  );
};

export default SelectableItem;
