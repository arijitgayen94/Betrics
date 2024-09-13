import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosInstance} from '../../helpers';

const getSubscribedMarketplaceApi = async (
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get('/marketplace/')
      .then(response => {
        successCallback(response);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const getAllMarketplaceApi = async (
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get('/marketplace/?all=true')
      .then(response => {
        successCallback(response);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const subscribeMarketplaceApi = async (
  params: string,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/marketplace/subscribe', {uuid: params})
      .then(response => {
        successCallback(response);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const unsubscribeMarketplaceApi = async (
  params: string,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/marketplace/unsubscribe', {uuid: params})
      .then(response => {
        successCallback(response);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

export {
  getAllMarketplaceApi,
  getSubscribedMarketplaceApi,
  subscribeMarketplaceApi,
  unsubscribeMarketplaceApi,
};
