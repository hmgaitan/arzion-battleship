import React, { useContext, useState } from 'react';
import PlayerGameBoard from '../components/PlayerGameBoard';
import ComputerGameBoard from '../components/ComputerGameBoard';
import PlayerTips from '../components/PlayerTips';
import gameContext from '../context/game/gameContext';
import playerContext from '../context/player/playerContext';

import { LOSER, WINNER } from '../types';

import {
  coordsToIndex,
  generateEmptyLayout,
  generateRandomIndex,
  getNeighbors,
  indexToCoords,
  putEntityInLayout,
  SQUARE_STATE,
  updateSunkShips,
} from '../utils/layoutHelpers';

const GameScreen = () => {
  const [hitsByPlayer, setHitsByPlayer] = useState([]);
  const [hitsByComputer, setHitsByComputer] = useState([]);
  const [gameState, setGameState] = useState('player-turn');

  const { gameSurrenderFn, computerShips, changeResultFn, addComputerShipsFn } =
    useContext(gameContext);
  const { name, ships, setPlayerShipsFn } = useContext(playerContext);

  const surrenderGameFn = () => {
    gameSurrenderFn();
  };

  const changeTurn = () => {
    setGameState((oldGameState) =>
      oldGameState === 'player-turn' ? 'computer-turn' : 'player-turn'
    );
  };

  // Check if either player or computer ended the game
  const checkIfGameOver = () => {
    const successfulPlayerHits = hitsByPlayer.filter(
      (hit) => hit.type === 'hit'
    ).length;
    const successfulComputerHits = hitsByComputer.filter(
      (hit) => hit.type === 'hit'
    ).length;

    if (successfulComputerHits === 15 || successfulPlayerHits === 15) {
      setGameState('game-over');

      if (successfulComputerHits === 15) {
        changeResultFn(LOSER);
      }
      if (successfulPlayerHits === 15) {
        changeResultFn(WINNER);
      }

      return true;
    }

    return false;
  };

  const computerFire = (index, layout) => {
    let computerHits;

    if (layout[index] === 'ship') {
      computerHits = [
        ...hitsByComputer,
        {
          position: indexToCoords(index),
          type: SQUARE_STATE.hit,
        },
      ];
    }
    if (layout[index] === 'empty') {
      computerHits = [
        ...hitsByComputer,
        {
          position: indexToCoords(index),
          type: SQUARE_STATE.miss,
        },
      ];
    }
    const sunkShips = updateSunkShips(computerHits, ships);
    setPlayerShipsFn(sunkShips);
    setHitsByComputer(computerHits);
  };

  // Change to computer turn, check if game over and stop if yes; if not fire into an eligible square
  const handleComputerTurn = () => {
    changeTurn();

    if (checkIfGameOver()) {
      return;
    }

    // Recreate layout to get eligible squares
    let layout = ships.reduce(
      (prevLayout, currentShip) =>
        putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship),
      generateEmptyLayout()
    );

    layout = hitsByComputer.reduce(
      (prevLayout, currentHit) =>
        putEntityInLayout(prevLayout, currentHit, currentHit.type),
      layout
    );

    layout = ships.reduce(
      (prevLayout, currentShip) =>
        currentShip.sunk
          ? putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship_sunk)
          : prevLayout,
      layout
    );

    const successfulComputerHits = hitsByComputer.filter(
      (hit) => hit.type === 'hit'
    );

    const nonSunkComputerHits = successfulComputerHits.filter((hit) => {
      const hitIndex = coordsToIndex(hit.position);
      return layout[hitIndex] === 'hit';
    });

    let potentialTargets = nonSunkComputerHits
      .flatMap((hit) => getNeighbors(hit.position))
      .filter((idx) => layout[idx] === 'empty' || layout[idx] === 'ship');

    // Until there's a successful hit
    if (potentialTargets.length === 0) {
      const layoutIndices = layout.map((item, idx) => idx);
      potentialTargets = layoutIndices.filter(
        (index) => layout[index] === 'ship' || layout[index] === 'empty'
      );
    }

    const randomIndex = generateRandomIndex(potentialTargets.length);

    const target = potentialTargets[randomIndex];

    setTimeout(() => {
      computerFire(target, layout);
      changeTurn();
    }, 300);
  };

  return (
    <section id="game-screen">
      <PlayerTips
        hitsByPlayer={hitsByPlayer}
        surrenderFn={surrenderGameFn}
        playerName={name}
        turn={gameState}
      />

      <PlayerGameBoard
        hitsByComputer={hitsByComputer}
        placedShips={ships}
        playerName={name}
      />

      <ComputerGameBoard
        computerShips={computerShips}
        gameState={gameState}
        hitsByPlayer={hitsByPlayer}
        setHitsByPlayer={setHitsByPlayer}
        handleComputerTurn={handleComputerTurn}
        checkIfGameOver={checkIfGameOver}
        setComputerShips={addComputerShipsFn}
      />
    </section>
  );
};

export default GameScreen;
