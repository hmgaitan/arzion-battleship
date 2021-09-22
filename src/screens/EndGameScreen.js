import React, { useContext } from 'react';
import gameContext from '../context/game/gameContext';
import playerContext from '../context/player/playerContext';

const EndGameScreen = () => {
  const { name, restartPlayerFn } = useContext(playerContext);
  const { result, gameRestartGameFn } = useContext(gameContext);

  const restart = () => {
    restartPlayerFn();
    gameRestartGameFn();
  };

  return (
    <section>
      <h1>Player: {name}</h1>
      <h2>Your result is {result}</h2>

      <button type="button" onClick={restart}>
        Start Again
      </button>
    </section>
  );
};

export default EndGameScreen;
