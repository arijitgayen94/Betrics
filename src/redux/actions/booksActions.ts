import {
  LOADER,
  RESET_BOOK_STORE,
  SET_ALL_SPORTSBOOK,
  SET_ALL_TRANSACTIONS,
  SET_SUBSCRIBED_SPORTSBOOK,
} from '../actionTypes';
import {
  getAllSportsbookApi,
  getSportsbookTransactionsApi,
  getSubscribedSportsbookApi,
  subscribeBookApi,
  unsubscribeBookApi,
  updateSportBookBalanceApi,
  updateSportBookRatingApi,
} from '../apis';
import {AppDispatch} from '../store';
import toast from 'react-native-simple-toast';

const loaderAction = (payload: boolean) => {
  return (dispatch: any) => {
    dispatch({type: LOADER, payload: payload});
  };
};

const getAllSportsBookAction = (
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    loaderAction(true);
    getAllSportsbookApi(
      (res: any) => {
        const {data} = res;
        dispatch({type: SET_ALL_SPORTSBOOK, payload: data});
        if (successCallback) {
          successCallback(data);
        }
        loaderAction(false);
      },
      (data: any) => {
        if (errorCallback) {
          errorCallback(data);
        }
      },
    );
    return;
  };
};

const getTransactionsAction = (
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    loaderAction(true);
    getSportsbookTransactionsApi(
      (res: any) => {
        const {results} = res.data;
        dispatch({type: SET_ALL_TRANSACTIONS, payload: results || []});
        if (successCallback) {
          successCallback(res.data);
        }
        loaderAction(false);
      },
      (data: any) => {
        if (errorCallback) {
          errorCallback(data);
        }
      },
    );
    return;
  };
};

const getSubscribedSportsBookAction = (
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    loaderAction(true);
    getSubscribedSportsbookApi(
      (res: any) => {
        const {data} = res;
        dispatch({type: SET_SUBSCRIBED_SPORTSBOOK, payload: data});
        if (successCallback) {
          successCallback(data);
        }
        loaderAction(false);
      },
      (data: any) => {
        if (errorCallback) {
          errorCallback(data);
        }
      },
    );
    return;
  };
};
const subscribeSportsBookAction = (
  params: string,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  return () => {
    loaderAction(true);
    subscribeBookApi(
      params,
      (data: any) => {
        successCallback(data);
        loaderAction(false);
      },
      (data: any) => {
        errorCallback(data);
      },
    );
  };
};
const unsubscribeSportsBookAction = (
  params: string,
  successCallback: (data: any) => void,
  errorCallback: (error: any) => void,
) => {
  return () => {
    loaderAction(true);
    unsubscribeBookApi(
      params,
      (data: any) => {
        successCallback(data);
        loaderAction(false);
      },
      (error: any) => {
        errorCallback(error);
        toast.show("Book's wager status is in pending!", 2);
      },
    );
  };
};

const updateSportBookBalanceAction = (
  params: {book_id: string; balance: number},
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  return () => {
    loaderAction(true);
    updateSportBookBalanceApi(
      params,
      (data: any) => {
        successCallback(data);
        loaderAction(false);
      },
      (data: any) => {
        errorCallback(data);
      },
    );
  };
};

const updateSportBookRatingAction = (
  params: {book_id: string; rating: number},
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  return () => {
    loaderAction(true);
    updateSportBookRatingApi(
      params,
      (data: any) => {
        successCallback(data);
        loaderAction(false);
      },
      (data: any) => {
        errorCallback(data);
      },
    );
  };
};

const resetBooksAction = () => {
  return (dispatch: any) => {
    dispatch({type: RESET_BOOK_STORE});
  };
};

export {
  getSubscribedSportsBookAction,
  getAllSportsBookAction,
  subscribeSportsBookAction,
  unsubscribeSportsBookAction,
  updateSportBookBalanceAction,
  getTransactionsAction,
  updateSportBookRatingAction,
  resetBooksAction,
};
