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
    <>
      <div className="title heading">
        {heading}
        <hr />
      </div>
      <div className="grid">
        <div className="columns">
          {renderDefaultTile()}
          {list.map((tile) => (
            <div className="column is-narrow">{tile}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Grid;
