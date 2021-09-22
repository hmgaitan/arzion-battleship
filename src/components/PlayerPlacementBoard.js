/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import {
  calculateOverhang,
  canBePlaced,
  generateEmptyLayout,
  indexToCoords,
  putEntityInLayout,
  SQUARE_STATE,
  stateToClass,
} from '../utils/layoutHelpers';

const PlayerPlacementBoard = ({
  currentlyPlacing,
  setCurrentlyPlacing,
  rotateShip,
  placeShip,
  placedShips,
}) => {
  // Player ships on empty layout
  let layout = placedShips.reduce(
    (prevLayout, currentShip) =>
      putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship),
    generateEmptyLayout()
  );

  layout = placedShips.reduce(
    (prevLayout, currentShip) =>
      currentShip.sunk
        ? putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship_sunk)
        : prevLayout,
    layout
  );

  const isPlacingOverBoard =
    currentlyPlacing && currentlyPlacing.position != null;
  const canPlaceCurrentShip =
    isPlacingOverBoard && canBePlaced(currentlyPlacing, layout);

  if (isPlacingOverBoard) {
    if (canPlaceCurrentShip) {
      layout = putEntityInLayout(layout, currentlyPlacing, SQUARE_STATE.ship);
    } else {
      const forbiddenShip = {
        ...currentlyPlacing,
        length: currentlyPlacing.length - calculateOverhang(currentlyPlacing),
      };
      layout = putEntityInLayout(layout, forbiddenShip, SQUARE_STATE.forbidden);
    }
  }

  const squares = layout.map((square, index) => (
    <div
      onContextMenu={rotateShip}
      onClick={() => {
        if (canPlaceCurrentShip) {
          placeShip(currentlyPlacing);
        }
      }}
      className={`square ${stateToClass[square]}`}
      key={`square-${index}`}
      id={`square-${index}`}
      onMouseOver={() => {
        if (currentlyPlacing) {
          setCurrentlyPlacing({
            ...currentlyPlacing,
            position: indexToCoords(index),
          });
        }
      }}
    />
  ));

  return (
    <div>
      <div className="board">{squares}</div>
    </div>
  );
};

PlayerPlacementBoard.propTypes = {
  currentlyPlacing: PropTypes.object,
  setCurrentlyPlacing: PropTypes.func.isRequired,
  rotateShip: PropTypes.func.isRequired,
  placeShip: PropTypes.func.isRequired,
  placedShips: PropTypes.array.isRequired,
};

PlayerPlacementBoard.defaultProps = {
  currentlyPlacing: undefined,
};
export default PlayerPlacementBoard;
