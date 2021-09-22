/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReplicaBox from './ReplicaBox';

const PlayerFleet = ({
  availableShips,
  selectShip,
  currentlyPlacing,
  restartPlacement,
  startGame,
  addNewPlayer,
}) => {
  const shipsLeft = availableShips.map((ship) => ship.name);

  const [disableStart, setDisableStart] = useState(true);

  const newPlayerHandler = (e) => {
    const { value } = e.target;

    if (value.length > 3) {
      setDisableStart(false);
      addNewPlayer(value);
    } else {
      setDisableStart(true);
    }
  };

  const shipReplicaBoxes = shipsLeft.map((shipName) => (
    <ReplicaBox
      selectShip={selectShip}
      key={shipName}
      isCurrentlyPlacing={
        currentlyPlacing && currentlyPlacing.name === shipName
      }
      shipName={shipName}
      availableShips={availableShips}
    />
  ));

  const fleet = (
    <div id="replica-fleet">
      {shipReplicaBoxes}
      <p className="player-tip">Right click to rotate before you position.</p>
      <p className="restart" onClick={restartPlacement}>
        Restart
      </p>
    </div>
  );

  const playButton = (
    <div id="play-ready">
      <p className="player-tip">Ships are in formation.</p>
      <input
        type="text"
        placeholder="Insert your name"
        onChange={newPlayerHandler}
      />
      <button id="play-button" onClick={startGame} disabled={disableStart}>
        Start game
      </button>
    </div>
  );

  return (
    <div id="available-ships">
      <div className="tip-box-title"> Your Ships</div>
      {availableShips.length > 0 ? fleet : playButton}
    </div>
  );
};

PlayerFleet.propTypes = {
  availableShips: PropTypes.array.isRequired,
  selectShip: PropTypes.func.isRequired,
  currentlyPlacing: PropTypes.object,
  restartPlacement: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  addNewPlayer: PropTypes.func.isRequired,
};

PlayerFleet.defaultProps = {
  currentlyPlacing: undefined,
};
export default PlayerFleet;
