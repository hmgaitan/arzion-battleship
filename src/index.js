import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './css/style.css';
import GameState from './context/game';
import PlayerState from './context/player';

ReactDOM.render(
  <React.StrictMode>
    <GameState>
      <PlayerState>
        <App />
      </PlayerState>
    </GameState>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
