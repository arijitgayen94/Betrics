import {
  RESET_SUBSCRIPTION_STORE,
  SET_SUBSCRIPTION,
  SET_SUBSCRIPTION_LOADING,
} from '../actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  isSubscribed: false,
};

const subscriptionReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_SUBSCRIPTION_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_SUBSCRIPTION:
      return {
        ...state,
        isSubscribed: action.payload,
      };
    case RESET_SUBSCRIPTION_STORE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export {subscriptionReducer};
