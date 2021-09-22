/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const ReplicaBox = ({
  shipName,
  selectShip,
  availableShips,
  isCurrentlyPlacing,
}) => {
  const ship = availableShips.find((item) => item.name === shipName);
  const shipLength = new Array(ship.length).fill('ship');
  const allReplicaSquares = shipLength.map((item, index) => (
    <div className="small-square" key={index} />
  ));

  return (
    <div
      id={`${shipName}-replica`}
      onClick={() => selectShip(shipName)}
      key={`${shipName}`}
      className={isCurrentlyPlacing ? 'replica placing' : 'replica'}
    >
      <div className="replica-title">{shipName}</div>
      <div className="replica-squares">{allReplicaSquares}</div>
    </div>
  );
};

ReplicaBox.propTypes = {
  shipName: PropTypes.string.isRequired,
  selectShip: PropTypes.func.isRequired,
  availableShips: PropTypes.array.isRequired,
  isCurrentlyPlacing: PropTypes.bool,
};

ReplicaBox.defaultProps = {
  isCurrentlyPlacing: false,
};
export default ReplicaBox;
