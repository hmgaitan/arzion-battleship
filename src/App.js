import React, { useContext } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import gameContext from './context/game/gameContext';

import { START_SCREEN } from './types';

const App = () => {
  const { activeScreen } = useContext(gameContext);

  return (
    <>
      <Header />
      {activeScreen === START_SCREEN && <p>HOLA MUNDO REACT</p>}
      <Footer />
    </>
  );
};

export default App;
