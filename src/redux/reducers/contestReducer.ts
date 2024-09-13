import {
  SET_CONTEST_LIST,
  SET_CONTEST_DETAILS,
  SET_TRIBE,
  SET_TRIBE_LEADERS,
  SET_INDIVIDUAL_LEADERS,
  SET_WAGER,
  RESET_CONTEST_STORE,
} from '../actionTypes';

const INITIAL_STATE = {
  contestList: [],
  contestDetails: {},
  tribe: {},
  tribeLeaders: [],
  tribeIndividualLeaders: {},
  wager: {},
};

const contestReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_CONTEST_LIST:
      return {
        ...state,
        contestList: action.payload,
      };
    case SET_CONTEST_DETAILS:
      return {
        ...state,
        contestDetails: action.payload,
      };
    case SET_TRIBE:
      return {
        ...state,
        tribe: action.payload,
      };
    case SET_TRIBE_LEADERS:
      return {
        ...state,
        tribeLeaders: action.payload,
      };
    case SET_INDIVIDUAL_LEADERS:
      return {
        ...state,
        tribeIndividualLeaders: action.payload,
      };
    case SET_WAGER:
      return {
        ...state,
        wager: action.payload,
      };
    case RESET_CONTEST_STORE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export {contestReducer};
