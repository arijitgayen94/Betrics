import {LOADER, LOADER_FEED} from '../actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  isLoadingFeed: false,
};

const loadingReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LOADER:
      return {
        ...state,
        isLoading: action.payload,
      };
    case LOADER_FEED:
      return {
        ...state,
        isLoadingFeed: action.payload,
      };
    default:
      return state;
  }
};

export {loadingReducer};
