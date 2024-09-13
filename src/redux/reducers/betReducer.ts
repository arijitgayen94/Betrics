import {
  RESET_BET_STORE,
  SET_BET_QUEUE,
  SET_BET_QUEUE_COUNT,
} from '../actionTypes';

const INITIAL_STATE = {
  count: 0,
  betQueue: [],
};

const betReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_BET_QUEUE_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    case SET_BET_QUEUE:
      return {
        ...state,
        betQueue: action.payload,
      };
    case RESET_BET_STORE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export {betReducer};
