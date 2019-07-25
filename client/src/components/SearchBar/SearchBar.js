import React, { useState, useEffect } from 'react';
import SearchInput, { createFilter } from 'react-search-input';
import './SearchBar.css';

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchItemsVisibility, setSearchItemsVisibility] = useState('none');
  useEffect(() => {
    document.addEventListener('click', makeSearchResultsInVisible, true);
    return () => {
      document.removeEventListener('click', makeSearchResultsInVisible, true);
    };
  });
  const filteredObjects = props.objects.filter(
    createFilter(searchTerm, props.keysToFilter)
  );
  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };
  const makeSearchResultsVisible = () => {
    setSearchItemsVisibility('block');
  };
  const makeSearchResultsInVisible = () => {
    setSearchItemsVisibility('none');
  };
  const searchItemClicked = (object) => {
    setSearchItemsVisibility('none');
    props.searchItemClicked(object);
  };
  return (
    <div>
      <SearchInput
        className="search-input"
        onChange={updateSearchTerm}
        onClick={makeSearchResultsVisible}
      />
      {filteredObjects.slice(0, 5).map((object) => {
        return (
          <div
            key={object[props.idKey]}
            style={{
              width: '14vw',
              display: searchItemsVisibility,
              background: 'white',
              borderBottom: '1px solid lightgray',
              marginLeft: '0.6em',
              padding: '0.5em'
            }}
            onClick={() => searchItemClicked(object)}
          >
            {object[props.valueKey]}
          </div>
        );
      })}
    </div>
  );
};

export default SearchBar;
