import { ADD_PLAYER_NAME, ADD_PLAYER_SHIPS, RESTART_GAME } from '../../types';

const playerReducer = (state, action) => {
  switch (action.type) {
    case ADD_PLAYER_NAME:
      return {
        ...state,
        name: action.payload,
      };

    case ADD_PLAYER_SHIPS:
      return {
        ...state,
        ships: action.payload,
      };

    case RESTART_GAME:
      return {
        ...state,
        ships: [],
        name: '',
      };

    default:
      return state;
  }
};

export default playerReducer;
