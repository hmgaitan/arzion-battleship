import React, { useReducer } from 'react';
import PropType from 'prop-types';

import gameReducer from './gameReducer';
import gameContext from './gameContext';

import { CHANGE_SCREEN, GAME_RESULT, START_SCREEN } from '../../types';

const GameState = (props) => {
  const { children } = props;

  const initialState = {
    activeScreen: START_SCREEN,
    result: undefined,
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

  return (
    <gameContext.Provider
      value={{
        activeScreen: state.activeScreen,
        result: state.result,
        changeScreenFn,
        changeResultFn,
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
