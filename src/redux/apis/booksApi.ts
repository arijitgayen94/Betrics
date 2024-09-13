import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosInstance} from '../../helpers';

const getSubscribedSportsbookApi = async (
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get('/sportsbook/')
      .then(response => {
        successCallback(response);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const getSportsbookTransactionsApi = async (
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get('/sportsbook/transaction')
      .then(response => {
        successCallback(response);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};
const getAllSportsbookApi = async (
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get('/sportsbook/?all=true')
      .then(response => {
        successCallback(response);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const subscribeBookApi = async (
  params: string,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/sportsbook/subscribe', {book_id: params})
      .then(response => {
        successCallback(response);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const unsubscribeBookApi = async (
  params: string,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/sportsbook/unsubscribe', {book_id: params})
      .then(response => {
        successCallback(response);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const updateSportBookBalanceApi = async (
  params: {book_id: string; balance: number},
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .patch(`/sportsbook/${params.book_id}`, {balance: params.balance})
      .then(response => {
        successCallback(response);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const updateSportBookRatingApi = async (
  params: {book_id: string; rating: number},
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .patch(`/sportsbook/${params.book_id}`, {rating: params.rating})
      .then(response => {
        successCallback(response);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

export {
  getAllSportsbookApi,
  getSubscribedSportsbookApi,
  subscribeBookApi,
  unsubscribeBookApi,
  updateSportBookBalanceApi,
  getSportsbookTransactionsApi,
  updateSportBookRatingApi,
};
