import {
  RESET_AUTH_STORE,
  SET_SPORT_NAME,
  SET_TERMS_CONDITIONS,
  SET_USER,
} from '../actionTypes';

const INITIAL_STATE = {
  user: {},
  sport: '',
  termsAndCondition: {},
};

const authReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_SPORT_NAME:
      return {
        ...state,
        sport: action.payload,
      };
    case SET_TERMS_CONDITIONS:
      return {
        ...state,
        termsAndCondition: action.payload,
      };
    case RESET_AUTH_STORE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export {authReducer};
