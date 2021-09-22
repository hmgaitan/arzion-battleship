import React, { useReducer } from 'react';
import PropType from 'prop-types';

import gameReducer from './gameReducer';
import gameContext from './gameContext';

import { CHANGE_SCREEN, START_SCREEN } from '../../types';

const GameState = (props) => {
  const { children } = props;

  const initialState = {
    activeScreen: START_SCREEN,
  };

  const [state, dispatch] = useReducer(gameReducer, initialState);

  const changeScreenFn = (screenName) => {
    dispatch({
      type: CHANGE_SCREEN,
      payload: screenName,
    });
  };

  return (
    <gameContext.Provider
      value={{ activeScreen: state.activeScreen, changeScreenFn }}
    >
      {children}
    </gameContext.Provider>
  );
};

GameState.propTypes = {
  children: PropType.node.isRequired,
};
export default GameState;
