import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosInstance} from '../../helpers';
import {CheckoutProductModal} from '../modals';

const getCheckSubscriptionApi = async (
  successCallback: (response: any) => void,
  errorCallback: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get('/subscription/check_subscription')
      .then(result => {
        successCallback(result);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const getProductsApi = async (
  successCallback: (response: any) => void,
  errorCallback: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get('/subscription/products')
      .then(result => {
        successCallback(result);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};
const postCheckoutApi = async (
  body: CheckoutProductModal,
  successCallback: (response: any) => void,
  errorCallback: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/subscription/checkout', body)
      .then(result => {
        successCallback(result);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const postClientSecret = async (
  body: any,
  successCallback: (response: any) => void,
  errorCallback: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/subscription/checkout_with_wallet', body)
      .then(result => {
        successCallback(result);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const deleteCancelSubscriptionApi = async (
  successCallback: (response: any) => void,
  errorCallback: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .delete('/subscription/cancel_subscription')
      .then(result => {
        successCallback(result);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const postVerifyCouponApi = async (
  coupon: string,
  successCallback: (response: any) => void,
  errorCallback: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/subscription/verify_coupon', {coupon})
      .then(result => {
        successCallback(result);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

export {
  getCheckSubscriptionApi,
  getProductsApi,
  postCheckoutApi,
  deleteCancelSubscriptionApi,
  postVerifyCouponApi,
  postClientSecret,
};
