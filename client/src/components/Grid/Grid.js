import React from 'react';
import './Grid.css';
import { Tile } from '..';

const Grid = ({ heading, list, actionClicked, action }) => {
  const renderDefaultTile = () => {
    if (action) {
      return (
        <div className="column is-narrow">
          <Tile>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => {
                actionClicked();
              }}
            >
              {action}
            </span>
          </Tile>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid">
      <div className="title">
        {heading}
        <hr />
      </div>
      <div className="columns">
        {list.map((tile) => (
          <div className="column is-narrow">{tile}</div>
        ))}
        {renderDefaultTile()}
      </div>
    </div>
  );
};

export default Grid;
