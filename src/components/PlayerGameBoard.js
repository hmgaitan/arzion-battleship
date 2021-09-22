/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import {
  generateEmptyLayout,
  putEntityInLayout,
  SQUARE_STATE,
  stateToClass,
} from '../utils/layoutHelpers';

const PlayerGameBoard = ({ playerName, placedShips, hitsByComputer }) => {
  // Player ships on empty layout
  let layout = placedShips.reduce(
    (prevLayout, currentShip) =>
      putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship),
    generateEmptyLayout()
  );

  // Hits by computer
  layout = hitsByComputer.reduce(
    (prevLayout, currentHit) =>
      putEntityInLayout(prevLayout, currentHit, currentHit.type),
    layout
  );

  layout = placedShips.reduce(
    (prevLayout, currentShip) =>
      currentShip.sunk
        ? putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship_sunk)
        : prevLayout,
    layout
  );

  const squares = layout.map((square, index) => (
    <div
      className={`square ${stateToClass[square]}`}
      key={`square-${index}`}
      id={`square-${index}`}
    />
  ));

  return (
    <div>
      <h2 className="player-title">{playerName.toUpperCase()}</h2>
      <div className="board">{squares}</div>
    </div>
  );
};

PlayerGameBoard.propTypes = {
  playerName: PropTypes.string.isRequired,
  placedShips: PropTypes.array.isRequired,
  hitsByComputer: PropTypes.array.isRequired,
};
export default PlayerGameBoard;
