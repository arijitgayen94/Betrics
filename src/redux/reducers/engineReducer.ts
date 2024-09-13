import {
  RESET_ENGINE_STORE,
  SET_ACTIVE_ENGINE,
  SET_ENGINES,
} from '../actionTypes';

const INITIAL_STATE = {
  engines: [],
  activeEngine: {},
};

const engineReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_ENGINES:
      return {
        ...state,
        engines: action.payload,
      };
    case SET_ACTIVE_ENGINE:
      return {
        ...state,
        activeEngine: action.payload,
      };
    case RESET_ENGINE_STORE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export {engineReducer};
