import toast from 'react-native-simple-toast';
import {AppDispatch} from '../store';
import {
  getAllNotificationApi,
  getAllNotificationReadApi,
  getNotificationCountApi,
  getNotificationReadApi,
} from '../apis/notificationApi';
import {
  LOADER,
  NOTIFICATION_COUNT,
  RESET_NOTIFICATION_STORE,
  SET_ALL_NOTIFICATIONS,
  UPDATE_NOTIFICATIONS,
} from '../actionTypes';

const getAllNotificationAction = (page: number) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    getAllNotificationApi(
      page,
      (response: any) => {
        if (page === 1) {
          dispatch({type: SET_ALL_NOTIFICATIONS, payload: response.data});
        } else {
          dispatch({type: UPDATE_NOTIFICATIONS, payload: response.data});
        }
        dispatch({type: LOADER, payload: false});
      },
      (error: any) => {
        toast.show(error.data?.[0]?.message, 2);
      },
    );
    return;
  };
};

const makeAllNotificationReadAction = (
  successCallback: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    getAllNotificationReadApi(
      (response: any) => {
        successCallback(response.data.status);
        dispatch({type: LOADER, payload: false});
      },
      (error: any) => {
        toast.show(error.data?.[0]?.message, 2);
      },
    );
    return;
  };
};

const makeNotificationReadAction = (
  params: string,
  body: any,
  successCallback: (data: any) => void,
) => {
  return () => {
    getNotificationReadApi(
      params,
      body,
      (response: any) => {
        successCallback(response.data);
      },
      (error: any) => {
        toast.show(error.data?.[0]?.message, 2);
      },
    );
    return;
  };
};

const getNotificationCountAction = () => {
  return (dispatch: AppDispatch) => {
    getNotificationCountApi(
      (response: any) => {
        dispatch({type: NOTIFICATION_COUNT, payload: response.data.count});
      },
      (error: any) => {
        toast.show(error.data?.[0]?.message, 2);
      },
    );
    return;
  };
};

const resetNotificationAction = () => {
  return (dispatch: any) => {
    dispatch({type: RESET_NOTIFICATION_STORE});
  };
};

export {
  getAllNotificationAction,
  makeAllNotificationReadAction,
  makeNotificationReadAction,
  getNotificationCountAction,
  resetNotificationAction,
};
