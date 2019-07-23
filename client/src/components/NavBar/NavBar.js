/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
const NavBar = (props) => {

  const [state, setState] = useState('')

  return (
    <nav className="navbar" role="navigation" aria-label="dropdown navigation">
      <div className="navbar-menu">
        <div className="navbar-end">
          <div className={"navbar-item has-dropdown " + state}>
            <a className="navbar-link" onClick={() => { setState(state === '' ? "is-active" : '') }}>
              Settings
            </a>
            <div className="navbar-dropdown is-right">
              {props.navItems.map((navItem, index) =>
                <a key={`${navItem}-${index}`} className="navbar-item" onClick={() => {
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