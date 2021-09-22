import React, { useContext } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import gameContext from './context/game/gameContext';

import { START_SCREEN } from './types';
import StartScreen from './screens/StartScreen';

const App = () => {
  const { activeScreen } = useContext(gameContext);

  return (
    <>
      <Header />
      {activeScreen === START_SCREEN && <StartScreen />}
      <Footer />
    </>
  );
};

export default App;
