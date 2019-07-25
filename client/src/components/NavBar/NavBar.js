/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import logo from '../../constants/constants';

const NavBar = (props) => {

  const [state, setState] = useState('')

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
      <div style={{ display: 'flex', margin: '0.5em' }}>
        <img src={logo.src} alt={logo.alt} style={{ width: '3em' }} />
        <h1 className="title is-hidden-mobile" style={{ position: 'relative', top: '0.5em', left: '0.5em' }}>CODERHOOD</h1>
      </div>
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
      </nav>
    </div>
  );
}

export default NavBar;