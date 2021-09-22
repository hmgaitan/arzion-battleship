import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import playerReducer from './playerReducer';
import playerContext from './playerContext';

import { ADD_PLAYER_NAME, ADD_PLAYER_SHIPS } from '../../types';

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

  return (
    <playerContext.Provider
      value={{
        name: state.name,
        addPlayerNameFn,
        setPlayerShipsFn,
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
