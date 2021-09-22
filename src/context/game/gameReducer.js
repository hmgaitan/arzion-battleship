import {
  CHANGE_SCREEN,
  GAME_RESULT,
  ADD_COMPUTER_SHIPS,
  RESTART_GAME,
  SURRENDER_GAME,
  SURRENDER,
  END_GAME_SCREEN,
  START_SCREEN,
} from '../../types';

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
        activeScreen: END_GAME_SCREEN,
      };

    case ADD_COMPUTER_SHIPS:
      return {
        ...state,
        computerShips: action.payload,
      };

    case RESTART_GAME:
      return {
        ...state,
        computerShips: [],
        result: undefined,
        activeScreen: START_SCREEN,
      };

    case SURRENDER_GAME:
      return {
        ...state,
        computerShips: [],
        result: SURRENDER,
        activeScreen: END_GAME_SCREEN,
      };

    default:
      return state;
  }
};

export default gameReducer;
