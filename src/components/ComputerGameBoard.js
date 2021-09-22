/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import {
  generateEmptyLayout,
  indexToCoords,
  putEntityInLayout,
  SQUARE_STATE,
  stateToClass,
  updateSunkShips,
} from '../utils/layoutHelpers';

const ComputerGameBoard = ({
  computerShips,
  gameState,
  hitsByPlayer,
  setHitsByPlayer,
  handleComputerTurn,
  checkIfGameOver,
  setComputerShips,
}) => {
  // Ships on an empty layout
  let compLayout = computerShips.reduce(
    (prevLayout, currentShip) =>
      putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship),
    generateEmptyLayout()
  );

  //  Add hits dealt by player
  compLayout = hitsByPlayer.reduce(
    (prevLayout, currentHit) =>
      putEntityInLayout(prevLayout, currentHit, currentHit.type),
    compLayout
  );

  compLayout = computerShips.reduce(
    (prevLayout, currentShip) =>
      currentShip.sunk
        ? putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship_sunk)
        : prevLayout,
    compLayout
  );

  // Check what's at the square and decide what next
  const fireTorpedo = (index) => {
    if (compLayout[index] === 'ship') {
      const newHits = [
        ...hitsByPlayer,
        {
          position: indexToCoords(index),
          type: SQUARE_STATE.hit,
        },
      ];
      setHitsByPlayer(newHits);
      return newHits;
    }
    if (compLayout[index] === 'empty') {
      const newHits = [
        ...hitsByPlayer,
        {
          position: indexToCoords(index),
          type: SQUARE_STATE.miss,
        },
      ];
      setHitsByPlayer(newHits);
      return newHits;
    }
  };

  const playerTurn = gameState === 'player-turn';
  const playerCanFire = playerTurn && !checkIfGameOver();

  const alreadyHit = (index) =>
    compLayout[index] === 'hit' ||
    compLayout[index] === 'miss' ||
    compLayout[index] === 'ship-sunk';

  const compSquares = compLayout.map((square, index) => (
    <div
      // Only display square if it's a hit, miss, or sunk ship
      className={
        stateToClass[square] === 'hit' ||
        stateToClass[square] === 'miss' ||
        stateToClass[square] === 'ship-sunk'
          ? `square ${stateToClass[square]}`
          : `square`
      }
      key={`comp-square-${index}`}
      id={`comp-square-${index}`}
      onClick={() => {
        if (playerCanFire && !alreadyHit(index)) {
          const newHits = fireTorpedo(index);
          const shipsWithSunkFlag = updateSunkShips(newHits, computerShips);
          setComputerShips(shipsWithSunkFlag);
          handleComputerTurn();
        }
      }}
    />
  ));

  return (
    <div>
      <h2 className="player-title">Computer</h2>
      <div className="board">{compSquares}</div>
    </div>
  );
};

ComputerGameBoard.propTypes = {
  computerShips: PropTypes.array.isRequired,
  gameState: PropTypes.string.isRequired,
  hitsByPlayer: PropTypes.array.isRequired,
  setHitsByPlayer: PropTypes.func.isRequired,
  handleComputerTurn: PropTypes.func.isRequired,
  checkIfGameOver: PropTypes.func.isRequired,
  setComputerShips: PropTypes.func.isRequired,
};
export default ComputerGameBoard;
