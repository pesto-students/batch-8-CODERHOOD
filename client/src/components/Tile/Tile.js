import React from 'react';
import './Tile.css';
import { Link } from 'react-router-dom';

const Tile = ({ name, handleInvite, ...props }) => {
  return (
    <div className="tile has-text-centered">
      {props.to ? (
        <div className="tile__content">
          <div className="tile__content__link">
          <Link {...props}>
            <span className="title is-centered">{name}</span>
          </Link>
          </div>
          <button className="tile__content__option" onClick={handleInvite}>
            <span className="content">Invite</span>
          </button>
        </div>
      ) : null}
      <div className="tile__children">{props.children}</div>
    </div>
  );
};

export default Tile;
