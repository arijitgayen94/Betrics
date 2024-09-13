import {GET_FEEDS, RESET_FEED_STORE, UPDATE_FEEDS} from '../actionTypes';

const INITIAL_STATE = {
  feeds: [],
};

const feedReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case GET_FEEDS:
      return {
        ...state,
        feeds: action.payload,
      };
    case UPDATE_FEEDS:
      return {
        ...state,
        feeds: [...state.feeds, ...action.payload],
      };
    case RESET_FEED_STORE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export {feedReducer};
