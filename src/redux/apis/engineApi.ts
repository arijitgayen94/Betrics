import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosInstance} from '../../helpers';
import {CreateEngine, UpdateEngine, UpdateEngineConfiguration} from '../modals';

const postCreateEngineApi = async (
  body: CreateEngine,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/engine/', body)
      .then(response => {
        if (response) {
          if (successCallback) {
            successCallback(response);
          }
        }
      })
      .catch((error: any) => {
        if (errorCallback) {
          errorCallback(errorCallback(error.response));
        }
      });
  }
};

const getEngineListApi = async (
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get('/engine/')
      .then(response => {
        if (successCallback) {
          successCallback(response);
        }
      })
      .catch((error: any) => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};

const deleteEngineApi = async (
  engineUuid: string,
  successCallback?: () => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .delete('/engine/' + engineUuid)
      .then(() => {
        if (successCallback) {
          successCallback();
        }
      })
      .catch((error: any) => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};

const updateEngineApi = async (
  engine: UpdateEngine,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .patch('/engine/' + engine.uuid, engine)
      .then(response => {
        if (successCallback) {
          successCallback(response);
        }
      })
      .catch((error: any) => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};

const putUpdateEngineConfigurationApi = async (
  enginUuid: string,
  body: Array<UpdateEngineConfiguration>,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .put('/engine/' + enginUuid + '/change_configuration', body)
      .then(response => {
        if (successCallback) {
          successCallback(response);
        }
      })
      .catch((error: any) => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};

export {
  postCreateEngineApi,
  getEngineListApi,
  deleteEngineApi,
  updateEngineApi,
  putUpdateEngineConfigurationApi,
};
