import React from 'react';
import './Tile.css';
import { Link } from 'react-router-dom';

const Tile = ({ name, handleInvite, ...props }) => {
  return (
    <div className="box tile has-text-centered">
      {props.to ? (
        <div className="tile__content">
          <Link {...props}>
            <span className="title is-centered">{name}</span>
          </Link>
          <button className="tile__option" onClick={handleInvite}>
            <span className="content">Invite</span>
          </button>
        </div>
      ) : null}
      <div className="tile__children">{props.children}</div>
    </div>
  );
};

export default Tile;
