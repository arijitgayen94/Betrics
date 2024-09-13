import {
  RESET_BET_STORE,
  SET_BET_QUEUE,
  SET_BET_QUEUE_COUNT,
} from '../actionTypes';
import {
  postPlaceBetApi,
  postAddBetToQueueApi,
  getBetQueueCountApi,
  getBetQueueApi,
  postClearQueueApi,
  patchEditBetApi,
} from '../apis';
import {Bet, ClearBetQueue, PlaceBet} from '../modals';
import {AppDispatch} from '../store';
import toast from 'react-native-simple-toast';

const postPlaceBetAction = (
  body: Array<PlaceBet>,
  successCallback?: (data: any) => void,
  errorCallback?: (error: Error) => void,
) => {
  return () => {
    postPlaceBetApi(
      body,
      (res: any) => {
        const {data} = res;
        if (successCallback) {
          successCallback(data);
        }
      },
      (error: any) => {
        toast.show(error.data?.[0]?.message, 5);
        if (errorCallback) {
          errorCallback(error);
        }
      },
    );
    return;
  };
};

const postAddBetToQueueAction = (
  body: Bet,
  successCallback?: (data: any) => void,
  errorCallback?: (error: Error) => void,
) => {
  return () => {
    postAddBetToQueueApi(
      body,
      (res: any) => {
        const {data} = res;
        if (successCallback) {
          successCallback(data);
        }
      },
      (error: any) => {
        toast.show(error.data?.[0]?.message, 2);
        if (errorCallback) {
          errorCallback(error);
        }
      },
    );
    return;
  };
};

const getBetQueueCountAction = () => {
  return (dispatch: AppDispatch) => {
    getBetQueueCountApi(
      (res: any) => {
        const {data} = res;
        dispatch({type: SET_BET_QUEUE_COUNT, payload: data.count});
      },
      error => {
        console.error(error);
      },
    );
    return;
  };
};

const getBetQueueAction = () => {
  return (dispatch: AppDispatch) => {
    getBetQueueApi(
      (res: any) => {
        const {data} = res;
        dispatch({type: SET_BET_QUEUE, payload: data});
      },
      error => {
        console.error(error);
      },
    );
    return;
  };
};

const postClearBetQueueAction = (
  body: ClearBetQueue,
  successCallback?: (data: any) => void,
  errorCallback?: (error: Error) => void,
) => {
  return () => {
    postClearQueueApi(
      body,
      (res: any) => {
        if (successCallback) {
          successCallback(res);
        }
      },
      error => {
        if (errorCallback) {
          if (errorCallback) {
            errorCallback(error);
          }
        }
      },
    );
    return;
  };
};

const patchEditBetAction = (
  body: any,
  uuid: string,
  successCallback?: (data: any) => void,
) => {
  return () => {
    patchEditBetApi(
      body,
      uuid,
      (res: any) => {
        const {data} = res;
        if (successCallback) {
          successCallback(data);
        }
      },
      (error: any) => {
        toast.show(error.respnse.data?.[0]?.message, 2);
      },
    );
    return;
  };
};
const resetBetAction = () => {
  return (dispatch: any) => {
    dispatch({type: RESET_BET_STORE});
  };
};

export {
  postPlaceBetAction,
  postAddBetToQueueAction,
  getBetQueueCountAction,
  getBetQueueAction,
  postClearBetQueueAction,
  patchEditBetAction,
  resetBetAction,
};
