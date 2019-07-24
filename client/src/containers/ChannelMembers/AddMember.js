import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import './AddMember.css';

const AddMember = (props) => {
  const members = props.members;

  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
      return [];
    }
    const regex = new RegExp('^' + escapedValue, 'i');
    return members.filter((member) => regex.test(member.name));
  }
  function getSuggestionValue(suggestion) {
    return suggestion.name;
  }
  function renderSuggestion(suggestion) {
    return <span>{suggestion.name}</span>;
  }
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const onChange = (event, { newValue, method }) => {
    setValue(newValue);
  };
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };
  const inputProps = {
    placeholder: 'Add People',
    value,
    onChange: onChange
  };
  return (
    <div style={{ display: 'flex' }}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      <button
        className="button is-small"
        style={{ marginLeft: '1.6em' }}
        onClick={() => {
          props.handleAdd(members.filter((member) => member.name === value)[0]);
          setValue('');
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddMember;
