import React, { useState } from 'react';

import { SelectableItem } from '..';
import InputField from '../InputField/InputField';
import './ListBox.css';

const ListBox = (props) => {
  const { items } = props;

  // const [mainList, setMainList] = useState(items);
  // const [searchList, setSearchList] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleChange = (e) => {
    setSearchText(e.target.value);
    console.log(searchText);
  };

  return (
    <div className="box list-box">
      <InputField placeholder="search for user" onChange={handleChange} />
      {items
        .filter((item) =>
          searchText.length > 0 ? item.content.startsWith(searchText) : true
        )
        .map(({ id, content }) => (
          <SelectableItem
            key={id}
            content={content}
            handleChange={props.handleChange(id)}
          />
        ))}
    </div>
  );
};

export default ListBox;
