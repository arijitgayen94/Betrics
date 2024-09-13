import {
  RESET_BOOK_STORE,
  SET_ALL_SPORTSBOOK,
  SET_ALL_TRANSACTIONS,
  SET_SUBSCRIBED_SPORTSBOOK,
} from '../actionTypes';

const INITIAL_STATE = {
  user: undefined,
  subscribedSportsbook: [],
  allSportsbook: [],
  allTransactions: [],
};

const booksReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_SUBSCRIBED_SPORTSBOOK:
      return {
        ...state,
        subscribedSportsbook: action.payload,
      };
    case SET_ALL_SPORTSBOOK:
      return {
        ...state,
        allSportsbook: action.payload,
      };
    case SET_ALL_TRANSACTIONS:
      return {
        ...state,
        allTransactions: action.payload,
      };
    case RESET_BOOK_STORE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export {booksReducer};
