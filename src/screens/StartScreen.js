import React, { useContext, useState } from 'react';
import gameContext from '../context/game/gameContext';
import playerContext from '../context/player/playerContext';
import createAvailableShips from '../utils/shipConfig';
import PlayerFleet from '../components/PlayerFleet';

import { GAME_SCREEN } from '../types';
import PlayerPlacementBoard from '../components/PlayerPlacementBoard';

const StartScreen = () => {
  const { changeScreenFn } = useContext(gameContext);
  const { addPlayerNameFn, setPlayerShipsFn } = useContext(playerContext);

  const [currentlyPlacing, setCurrentlyPlacing] = useState(null);
  const [placedShips, setPlacedShips] = useState([]);
  const [availableShips, setAvailableShips] = useState(createAvailableShips());

  const selectShip = (shipName) => {
    const shipIdx = availableShips.findIndex((ship) => ship.name === shipName);
    const shipToPlace = availableShips[shipIdx];

    setCurrentlyPlacing({
      ...shipToPlace,
      orientation: 'horizontal',
      position: null,
    });
  };

  // eslint-disable-next-line no-shadow
  const placeShip = (currentlyPlacing) => {
    setPlacedShips([
      ...placedShips,
      {
        ...currentlyPlacing,
        placed: true,
      },
    ]);

    setAvailableShips((previousShips) =>
      previousShips.filter((ship) => ship.name !== currentlyPlacing.name)
    );

    setCurrentlyPlacing(null);
  };

  const rotateShip = (event) => {
    event.preventDefault();
    console.log(event);
    if (currentlyPlacing != null && event.button === 2) {
      setCurrentlyPlacing({
        ...currentlyPlacing,
        orientation:
          currentlyPlacing.orientation === 'vertical'
            ? 'horizontal'
            : 'vertical',
      });
    }
  };

  const startGame = () => {
    // generateComputerShips();
    setPlayerShipsFn(placedShips);
    changeScreenFn(GAME_SCREEN);
  };

  const restartPlacement = () => {
    setPlacedShips(true);
    setCurrentlyPlacing(null);
    setPlacedShips([]);
    setAvailableShips(createAvailableShips());
  };

  const addNewPlayer = (name) => {
    addPlayerNameFn(name);
  };

  return (
    <section id="game-screen">
      <PlayerFleet
        availableShips={availableShips}
        selectShip={selectShip}
        currentlyPlacing={currentlyPlacing}
        restartPlacement={restartPlacement}
        startGame={startGame}
        addNewPlayer={addNewPlayer}
      />

      <PlayerPlacementBoard
        currentlyPlacing={currentlyPlacing}
        setCurrentlyPlacing={setCurrentlyPlacing}
        rotateShip={rotateShip}
        placeShip={placeShip}
        placedShips={placedShips}
      />
    </section>
  );
};

export default StartScreen;
