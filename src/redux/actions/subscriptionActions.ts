import toast from 'react-native-simple-toast';
import {AppDispatch} from '../store';
import {
  RESET_SUBSCRIPTION_STORE,
  SET_SUBSCRIPTION,
  SET_SUBSCRIPTION_LOADING,
} from '../actionTypes';
import {
  deleteCancelSubscriptionApi,
  getCheckSubscriptionApi,
  getProductsApi,
  postCheckoutApi,
  postClientSecret,
  postVerifyCouponApi,
} from './../apis';
import {CheckoutProductModal, ProductModal} from '../modals';

const checkSubscriptionAction = (
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: SET_SUBSCRIPTION_LOADING, payload: true});
    getCheckSubscriptionApi(
      result => {
        dispatch({type: SET_SUBSCRIPTION_LOADING, payload: false});
        const {data} = result;
        dispatch({type: SET_SUBSCRIPTION, payload: data.status});
        if (successCallback) {
          successCallback(data);
        }
      },
      errorr => {
        dispatch({type: SET_SUBSCRIPTION_LOADING, payload: false});
        toast.show(errorr?.[0]?.message);
        if (errorCallback) {
          errorCallback(errorr);
        }
      },
    );
  };
};

const getProductsAction = (
  successCallback?: (data: Array<ProductModal>) => void,
  errorCallback?: (error: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: SET_SUBSCRIPTION_LOADING, payload: true});
    getProductsApi(
      result => {
        dispatch({type: SET_SUBSCRIPTION_LOADING, payload: false});
        const {data} = result;
        if (successCallback) {
          successCallback(data);
        }
      },
      errorr => {
        dispatch({type: SET_SUBSCRIPTION_LOADING, payload: false});
        toast.show(errorr?.[0]?.message);
        if (errorCallback) {
          errorCallback(errorr);
        }
      },
    );
  };
};

const checkoutAction = (
  body: CheckoutProductModal,
  successCallback?: (data: Array<ProductModal>) => void,
  errorCallback?: (error: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: SET_SUBSCRIPTION_LOADING, payload: true});
    postCheckoutApi(
      body,
      result => {
        dispatch({type: SET_SUBSCRIPTION_LOADING, payload: false});
        const {data} = result;
        if (successCallback) {
          successCallback(data);
        }
      },
      errorr => {
        dispatch({type: SET_SUBSCRIPTION_LOADING, payload: false});
        toast.show(errorr?.response?.data[0]?.message);
        if (errorCallback) {
          errorCallback(errorr);
        }
      },
    );
  };
};

const fetchClientSecret = (
  body: any,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  return () => {
    postClientSecret(
      body,
      result => {
        const {data} = result;
        if (successCallback) {
          successCallback(data);
        }
      },
      errorr => {
        toast.show(errorr?.response?.data[0]?.message);
        if (errorCallback) {
          errorCallback(errorr);
        }
      },
    );
  };
};

const cancelSubscriptionAction = (
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: SET_SUBSCRIPTION_LOADING, payload: true});
    deleteCancelSubscriptionApi(
      result => {
        dispatch({type: SET_SUBSCRIPTION_LOADING, payload: false});
        toast.show('Subscription cancelled');
        dispatch({type: SET_SUBSCRIPTION, payload: false});
        const {data} = result;
        if (successCallback) {
          successCallback(data);
        }
      },
      errorr => {
        dispatch({type: SET_SUBSCRIPTION_LOADING, payload: false});
        toast.show(errorr?.response?.data[0]?.message);
        if (errorCallback) {
          errorCallback(errorr);
        }
      },
    );
  };
};

const verifyCouponAction = (
  coupon: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: SET_SUBSCRIPTION_LOADING, payload: true});
    postVerifyCouponApi(
      coupon,
      result => {
        dispatch({type: SET_SUBSCRIPTION_LOADING, payload: false});
        toast.show('Coupon Applied!');
        const {data} = result;
        if (successCallback) {
          successCallback(data);
        }
      },
      errorr => {
        dispatch({type: SET_SUBSCRIPTION_LOADING, payload: false});
        toast.show(errorr?.response?.data[0]?.message, 2);
        if (errorCallback) {
          errorCallback(errorr);
        }
      },
    );
  };
};

const toggleSubscriptionLoadingAction = (value: boolean) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: SET_SUBSCRIPTION_LOADING, payload: value});
  };
};

const resetSubscriptionAction = () => {
  return (dispatch: any) => {
    dispatch({type: RESET_SUBSCRIPTION_STORE});
  };
};

export {
  checkSubscriptionAction,
  getProductsAction,
  checkoutAction,
  cancelSubscriptionAction,
  toggleSubscriptionLoadingAction,
  verifyCouponAction,
  resetSubscriptionAction,
  fetchClientSecret,
};
