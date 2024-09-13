import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosInstance} from '../../helpers';
import {Bet, ClearBetQueue, PlaceBet} from '../modals';

const postPlaceBetApi = async (
  body: Array<PlaceBet>,
  successCallback?: (data: any) => void,
  errorCallback?: (error: Error) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/bet/', body)
      .then((res: any) => {
        if (successCallback) {
          successCallback(res);
        }
      })
      .catch(error => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};

const postAddBetToQueueApi = async (
  body: Bet,
  successCallback?: (data: any) => void,
  errorCallback?: (error: Error) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/bet/bet-queue', body)
      .then((res: any) => {
        if (successCallback) {
          successCallback(res);
        }
      })
      .catch(error => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};

const getBetQueueCountApi = async (
  successCallback?: (data: any) => void,
  errorCallback?: (error: Error) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get('/bet/bet-queue/count')
      .then((res: any) => {
        if (successCallback) {
          successCallback(res);
        }
      })
      .catch((error: Error) => {
        if (errorCallback) {
          errorCallback(error);
        }
      });
  }
};

const getBetQueueApi = async (
  successCallback?: (data: any) => void,
  errorCallback?: (error: Error) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get('/bet/bet-queue')
      .then((res: any) => {
        if (successCallback) {
          successCallback(res);
        }
      })
      .catch((error: Error) => {
        if (errorCallback) {
          errorCallback(error);
        }
      });
  }
};

const postClearQueueApi = async (
  body: ClearBetQueue,
  successCallback?: (res: any) => void,
  errorCallback?: (error: Error) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/bet/bet-queue/remove_bets', body)
      .then((res: any) => {
        if (successCallback) {
          successCallback(res);
        }
      })
      .catch((error: Error) => {
        if (errorCallback) {
          errorCallback(error);
        }
      });
  }
};

const patchEditBetApi = async (
  body: any,
  uuid: string,
  successCallback?: (res: any) => void,
  errorCallback?: (error: Error) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .patch(`/bet/bet-queue/${uuid}`, body)
      .then((res: any) => {
        if (successCallback) {
          successCallback(res);
        }
      })
      .catch((error: Error) => {
        if (errorCallback) {
          errorCallback(error);
        }
      });
  }
};

export {
  postPlaceBetApi,
  postAddBetToQueueApi,
  getBetQueueCountApi,
  getBetQueueApi,
  postClearQueueApi,
  patchEditBetApi,
};
