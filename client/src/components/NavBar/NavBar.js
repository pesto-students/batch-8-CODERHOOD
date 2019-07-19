/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
const NavBar = (props) => {

  const [state, setState] = useState('')

  return (
    <nav class="navbar" role="navigation" aria-label="dropdown navigation">
      <div class="navbar-menu">
        <div class="navbar-end">
          <div class={"navbar-item has-dropdown " + state}>
            <a class="navbar-link" onClick={() => { setState(state === '' ? "is-active" : '') }}>
              Settings
            </a>
            <div class="navbar-dropdown is-right">
              {props.navItems.map(navItem =>
                <a class="navbar-item" onClick={() => {
                  setState('');
                  navItem.handler();
                }}>
                  {navItem.name}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>);
}

export default NavBar;