import {
  RESET_MARKET_STORE,
  SET_ALL_MARKETPLACE,
  SET_SUBSCRIBED_MARKETPLACE,
} from '../actionTypes';
import {
  getAllMarketplaceApi,
  getSubscribedMarketplaceApi,
  subscribeMarketplaceApi,
  unsubscribeMarketplaceApi,
} from '../apis';
import {AppDispatch} from '../store';
import toast from 'react-native-simple-toast';

const getAllMarketplaceAction = (
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    getAllMarketplaceApi(
      (res: any) => {
        const {data} = res;
        dispatch({type: SET_ALL_MARKETPLACE, payload: data});
        if (successCallback) {
          successCallback(data);
        }
      },
      (data: any) => {
        if (errorCallback) {
          errorCallback(data);
          toast.show(data.data?.[0]?.message, 2);
        }
      },
    );
    return;
  };
};
const getSubscribedMarketplaceAction = (
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    getSubscribedMarketplaceApi(
      (res: any) => {
        const {data} = res;
        dispatch({type: SET_SUBSCRIBED_MARKETPLACE, payload: data});
        if (successCallback) {
          successCallback(data);
        }
      },
      (data: any) => {
        if (errorCallback) {
          errorCallback(data);
        }
        toast.show(data.data?.[0]?.message, 2);
      },
    );
    return;
  };
};
const subscribeMarketplaceAction = (
  params: string,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  return () => {
    subscribeMarketplaceApi(
      params,
      (data: any) => {
        successCallback(data.data.Subscribed);
      },
      (data: any) => {
        errorCallback(data);
        toast.show(data.data?.[0]?.message, 2);
      },
    );
  };
};
const unsubscribeMarketplaceAction = (
  params: string,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  return () => {
    unsubscribeMarketplaceApi(
      params,
      (data: any) => {
        successCallback(data.data.Unsubscribed);
      },
      (data: any) => {
        errorCallback(data);
        toast.show(data.data?.[0]?.message, 2);
      },
    );
  };
};

const resetMarketPlaceAction = () => {
  return (dispatch: any) => {
    dispatch({type: RESET_MARKET_STORE});
  };
};

export {
  getSubscribedMarketplaceAction,
  getAllMarketplaceAction,
  subscribeMarketplaceAction,
  unsubscribeMarketplaceAction,
  resetMarketPlaceAction,
};
