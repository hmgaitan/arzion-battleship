import React, { useContext } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import gameContext from './context/game/gameContext';

import { END_GAME_SCREEN, GAME_SCREEN, START_SCREEN } from './types';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import EndGameScreen from './screens/EndGameScreen';

const App = () => {
  const { activeScreen } = useContext(gameContext);

  return (
    <>
      <Header />
      {activeScreen === START_SCREEN && <StartScreen />}
      {activeScreen === GAME_SCREEN && <GameScreen />}
      {activeScreen === END_GAME_SCREEN && <EndGameScreen />}
      <Footer />
    </>
  );
};

export default App;
