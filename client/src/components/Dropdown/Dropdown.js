import React, { useState } from 'react';
const Dropdown = (props) => {
  const [state, setState] = useState('');

  return (
    <div 
      class={'dropdown is-right ' + state}
      onMouseLeave={() => {
        setState('');
      }}
    >
      <div class="dropdown-trigger">
        <button
          class="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setState(state === '' ? 'is-active' : '');
          }}
        >
          <span>{props.title}</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          {props.items.map((item) => (
            <a
              class="dropdown-item"
              onClick={() => {
                setState('');
                item.handler();
              }}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
