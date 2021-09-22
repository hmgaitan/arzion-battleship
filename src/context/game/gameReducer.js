import { CHANGE_SCREEN } from '../../types';

const gameReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_SCREEN:
      return {
        ...state,
        activeScreen: action.payload,
      };

    default:
      return state;
  }
};

export default gameReducer;
