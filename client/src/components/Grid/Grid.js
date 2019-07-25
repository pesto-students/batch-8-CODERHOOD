import React from 'react';
import './Grid.css';
import { Tile } from '..';

const Grid = ({ heading, list, actionClicked, action }) => {
  const renderDefaultTile = () => {
    if (action) {
      return (
        <div className="grid__item">
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
          {renderDefaultTile()}
          {
            list.length ? 
              list.map((tile) => (
                <div className="grid__item">{tile}</div>
              ))
            :
            <h1>You have no joined workspaces</h1>
          }
      </div>
    </>
  );
};

export default Grid;
