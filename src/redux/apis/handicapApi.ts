import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosInstance} from '../../helpers';
import {GetHandicapModal, HandicapModal} from '../modals';

const getHandicapApi = async (
  body: GetHandicapModal,
  sportName: string,
  successCallback: (response: any) => void,
  errorCallback: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post(`/${sportName}/war-room/handicap`, body)
      .then(result => {
        successCallback(result);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const patchUpdateHandicapApi = async (
  body: HandicapModal,
  sportName: string,
  successCallback: (response: any) => void,
  errorCallback: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .patch(`/${sportName}/war-room/handicap/${body.uuid}`, {
        home_score: body?.home_score,
        away_score: body?.away_score,
      })
      .then(result => {
        successCallback(result);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const putUpdateHandicapApi = async (
  body: HandicapModal,
  sportName: string,
  successCallback: (response: any) => void,
  errorCallback: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .put(`/nba/war-room/handicap/${body.uuid}`, {
        home_score: body?.home_score,
        away_score: body?.away_score,
      })
      .then(result => {
        successCallback(result);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const getResetHandicapApi = async (
  uuid: string,
  sportName: string,
  successCallback: (response: any) => void,
  errorCallback: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get(`/${sportName}/war-room/handicap/${uuid}/reset`)
      .then(result => {
        successCallback(result);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

export {
  getHandicapApi,
  patchUpdateHandicapApi,
  getResetHandicapApi,
  putUpdateHandicapApi,
};
