import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import playerReducer from './playerReducer';
import playerContext from './playerContext';

import { ADD_PLAYER_NAME, ADD_PLAYER_SHIPS, RESTART_GAME } from '../../types';

const PlayerState = (props) => {
  const { children } = props;

  const initialState = {
    name: '',
    ships: [],
  };

  const [state, dispatch] = useReducer(playerReducer, initialState);

  const addPlayerNameFn = (name) => {
    dispatch({
      type: ADD_PLAYER_NAME,
      payload: name,
    });
  };

  const setPlayerShipsFn = (ships) => {
    dispatch({
      type: ADD_PLAYER_SHIPS,
      payload: ships,
    });
  };

  const restartPlayerFn = () => {
    dispatch({
      type: RESTART_GAME,
    });
  };

  return (
    <playerContext.Provider
      value={{
        name: state.name,
        ships: state.ships,
        addPlayerNameFn,
        setPlayerShipsFn,
        restartPlayerFn,
      }}
    >
      {children}
    </playerContext.Provider>
  );
};

PlayerState.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PlayerState;
