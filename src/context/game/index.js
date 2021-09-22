import React, { useReducer } from 'react';
import PropType from 'prop-types';

import gameReducer from './gameReducer';
import gameContext from './gameContext';

import {
  ADD_COMPUTER_SHIPS,
  CHANGE_SCREEN,
  GAME_RESULT,
  RESTART_GAME,
  START_SCREEN,
  SURRENDER_GAME,
} from '../../types';

const GameState = (props) => {
  const { children } = props;

  const initialState = {
    activeScreen: START_SCREEN,
    result: undefined,
    computerShips: [],
  };

  const [state, dispatch] = useReducer(gameReducer, initialState);

  const changeScreenFn = (screenName) => {
    dispatch({
      type: CHANGE_SCREEN,
      payload: screenName,
    });
  };

  const changeResultFn = (result) => {
    dispatch({
      type: GAME_RESULT,
      payload: result,
    });
  };

  const addComputerShipsFn = (ships) => {
    dispatch({
      type: ADD_COMPUTER_SHIPS,
      payload: ships,
    });
  };

  const gameSurrenderFn = () => {
    dispatch({
      type: SURRENDER_GAME,
    });
  };

  const gameRestartGameFn = () => {
    dispatch({
      type: RESTART_GAME,
    });
  };

  return (
    <gameContext.Provider
      value={{
        activeScreen: state.activeScreen,
        result: state.result,
        computerShips: state.computerShips,
        changeScreenFn,
        changeResultFn,
        addComputerShipsFn,
        gameSurrenderFn,
        gameRestartGameFn,
      }}
    >
      {children}
    </gameContext.Provider>
  );
};

GameState.propTypes = {
  children: PropType.node.isRequired,
};
export default GameState;
