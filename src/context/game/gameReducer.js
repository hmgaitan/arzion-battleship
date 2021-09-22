import { CHANGE_SCREEN, GAME_RESULT } from '../../types';

const gameReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_SCREEN:
      return {
        ...state,
        activeScreen: action.payload,
      };

    case GAME_RESULT:
      return {
        ...state,
        result: action.payload,
      };

    default:
      return state;
  }
};

export default gameReducer;
