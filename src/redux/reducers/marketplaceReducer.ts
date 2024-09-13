import {
  RESET_MARKET_STORE,
  SET_ALL_MARKETPLACE,
  SET_SUBSCRIBED_MARKETPLACE,
} from '../actionTypes';

const INITIAL_STATE = {
  subscribedMarketplace: [],
  allMarketplace: [],
};

const marketplaceReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_SUBSCRIBED_MARKETPLACE:
      return {
        ...state,
        subscribedMarketplace: action.payload,
      };
    case SET_ALL_MARKETPLACE:
      return {
        ...state,
        allMarketplace: action.payload,
      };
    case RESET_MARKET_STORE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export {marketplaceReducer};
