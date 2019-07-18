import React, { useState } from 'react';
import { ListBox } from '../../components';
import Button from '../../components/Button/Button';

import './Test.css';

const Test = () => {
  const dummyData = [
    {
      id: 111,
      content: 'John'
    },
    {
      id: 222,
      content: 'Bob'
    },
    {
      id: 333,
      content: 'Steve'
    }
  ];

  const [leftItems, setLeftItems] = useState(dummyData);
  const [leftSelectedItems, setLeftSelectedItems] = useState([]);

  const [rightItems, setRightItems] = useState([]);
  const [rightSelectedItems, setRightSelectedItems] = useState([]);

  const onSelect = (mainItems, selectedItems, setSelectedItems) => (
    id
  ) => () => {
    const selectedItem = mainItems.filter((item) => item.id === id)[0];
    const alreadySelectedItem = selectedItems.filter((item) => item.id === id);

    if (alreadySelectedItem.length > 0) {
      const filteredSelectedItems = selectedItems.filter(
        (item) => item.id !== selectedItem.id
      );
      setSelectedItems(filteredSelectedItems);
    } else {
      setSelectedItems((store) => [...store, selectedItem]);
    }
  };

  const addAll = () => {
    setRightItems((store) => {
      console.log('in addALL ::: ', store, leftItems);
      return [...store, ...leftItems]
    });
    setLeftItems([]);
    setLeftSelectedItems([]);
  };

  const addSelected = () => {
    setRightItems(store => [...store, ...leftSelectedItems]);
    setLeftSelectedItems([]);

    const selectedItemIds = leftSelectedItems.map(item => item.id); 
    let remainingItems = leftItems;
    for (const id of selectedItemIds) {
      remainingItems = remainingItems.filter(item => item.id !==  id);
    }
    setLeftItems(remainingItems);
  };
  
  const removeSelected =  () => {
    setLeftItems(store => [...store, ...rightSelectedItems]);
    setRightSelectedItems([]);

    const selectedItemIds = rightSelectedItems.map(item => item.id); 
    let remainingItems = rightItems;
    for (const id of selectedItemIds) {
      remainingItems = remainingItems.filter(item => item.id !==  id);
    }
    setRightItems(remainingItems);
  };

  const removeAll = () => {
    setLeftItems((store) => [...store, ...rightItems]);
    setRightItems([]);
    setRightSelectedItems([]);
  };

  return (
    <div className="columns is-vcentered">
      {/* Left list */}
      <div className="column is-two-fifths">
        <ListBox
          items={leftItems}
          handleChange={onSelect(
            leftItems,
            leftSelectedItems,
            setLeftSelectedItems
          )}
        />
      </div>
      <div className="column button-list">
        <Button cls="button-list__button" onClick={addAll}>
          {'>>'}
        </Button>
        <Button cls="button-list__button" onClick={addSelected}>
          {'>'}
        </Button>
        <Button cls="button-list__button" onClick={removeSelected}>
          {'<'}
        </Button>
        <Button cls="button-list__button" onClick={removeAll}>
          {'<<'}
        </Button>
      </div>
      {/* Right List */}
      <div className="column is-two-fifths">
        <ListBox
          items={rightItems}
          handleChange={onSelect(
            rightItems,
            rightSelectedItems,
            setRightSelectedItems
          )}
        />
      </div>
    </div>
  );
};

export default Test;
