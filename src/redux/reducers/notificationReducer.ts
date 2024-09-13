import {
  SET_ALL_NOTIFICATIONS,
  UPDATE_NOTIFICATIONS,
  MODIFY_NOTIFICATIONS,
  NOTIFICATION_COUNT,
  RESET_NOTIFICATION_STORE,
} from '../actionTypes';

const INITIAL_STATE = {
  notifications: {pagination: {}, count: 0, results: []},
  notificationCount: 0,
};

const notificationReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case UPDATE_NOTIFICATIONS:
      return {
        ...state,
        notifications: {
          pagination: action.payload.pagination,
          count: action.payload.count,
          results: [...state.notifications?.results, ...action.payload.results],
        },
      };
    case MODIFY_NOTIFICATIONS:
      return {
        ...state,
        notification: action.payload,
      };
    case NOTIFICATION_COUNT:
      return {
        ...state,
        notificationCount: action.payload,
      };
    case RESET_NOTIFICATION_STORE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export {notificationReducer};
