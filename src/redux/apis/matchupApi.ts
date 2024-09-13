import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosInstance} from '../../helpers';
const getMatchupScheduleApi = async (
  type: string,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    let url: string = `/${type}/schedule`;
    axiosInstance
      .get(url)
      .then(response => {
        successCallback(response);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const getMachupApi = async (
  params: any,
  page: number,
  game: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post(`/${game}/odds?page=${page}`, params)
      .then(response => {
        if (successCallback) {
          successCallback(response);
        }
      })
      .catch(error => {
        if (errorCallback) {
          errorCallback(error);
        }
      });
  }
};

const getMachupBestLineApi = async (
  params: any,
  page: number,
  game: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post(`/${game}/best-line?page=${page}`, params)
      .then(response => {
        if (successCallback) {
          successCallback(response);
        }
      })
      .catch(error => {
        if (errorCallback) {
          errorCallback(error);
        }
      });
  }
};

const getMachupEngineCalculationApi = async (
  page: number,
  body: {
    week_id: number;
    book_id: string;
  },
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post(`/engine/calculation?page=${page}`, body)
      .then(response => {
        if (successCallback) {
          successCallback(response);
        }
      })
      .catch(error => {
        if (errorCallback) {
          errorCallback(error);
        }
      });
  }
};

const getRetriveMatchupViewApi = async (
  body: any = {},
  sportName: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post(`/${sportName}/odds/retrieve`, body)
      .then(response => {
        if (successCallback) {
          successCallback(response);
        }
      })
      .catch(error => {
        if (errorCallback) {
          errorCallback(error);
        }
      });
  }
};

const getRetriveNflMatchupViewApi = async (
  body: any = {},
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/engine/retrieve_calculation', body)
      .then(response => {
        if (successCallback) {
          successCallback(response);
        }
      })
      .catch(error => {
        if (errorCallback) {
          errorCallback(error);
        }
      });
  }
};

const getBetInfoApi = async (
  body: any = {},
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/bet/bet-info/', body)
      .then(response => {
        if (successCallback) {
          successCallback(response);
        }
      })
      .catch(error => {
        if (errorCallback) {
          errorCallback(error);
        }
      });
  }
};

export {
  getMatchupScheduleApi,
  getMachupApi,
  getMachupEngineCalculationApi,
  getRetriveMatchupViewApi,
  getBetInfoApi,
  getRetriveNflMatchupViewApi,
  getMachupBestLineApi,
};
