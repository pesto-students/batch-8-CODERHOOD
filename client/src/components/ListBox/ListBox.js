import React, { useState } from 'react';

import SmallContainer from '../SmallContainer/SmallContainer';
import { SelectableItem } from '..';

const ListBox = (props) => {
  const { items, handleChange } = props;

  // const [mainList, setMainList] = useState(items);
  // const [searchList, setSearchList] = useState([]);

  return (
    <div className="box">
      {items.map(({ id, content }) => (
        <SelectableItem key={id} content={content} handleChange={handleChange(id)}/>
      ))}
    </div>
  );
};

export default ListBox;
