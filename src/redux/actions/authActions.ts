import {
  LOADER,
  RESET_AUTH_STORE,
  SET_SPORT_NAME,
  SET_TERMS_CONDITIONS,
  SET_USER,
} from '../actionTypes';
import {
  changePasswordApi,
  checkEmailExistsApi,
  createUserAccountApi,
  deactivateAccountApi,
  deleteAccountApi,
  forgotPsswordApi,
  getOtherUserDetailsApi,
  getUserDetailsApi,
  getUserFollowersApi,
  getUserFollowingApi,
  loginUserApi,
  loginWithGoogleApi,
  postNotificationToken,
  postRemoveFollowerApi,
  postUnfollowApi,
  postUserFollowApi,
  resetPasswordApi,
  sendUserDeviceInfoApi,
  signupWithGoogleApi,
  termsAndConditionsApi,
  updateUserAccountApi,
  uploadProfileImageApi,
  verifyOtpApi,
} from '../apis';
import {
  ChangePassword,
  CreateUser,
  LoginUser,
  ReestPassword,
  UpdateUser,
  User,
} from '../modals';
import toast from 'react-native-simple-toast';
import {AppDispatch} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setUserDetailsAction = (payload: User) => {
  return (dispatch: any) => {
    dispatch({type: SET_USER, payload: payload});
  };
};
const resetAuthAction = () => {
  return (dispatch: any) => {
    dispatch({type: RESET_AUTH_STORE});
  };
};

const getUserDetailsAction = (
  successCallback: (data: User) => void,
  errorCallback: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    getUserDetailsApi(
      async (data: User) => {
        successCallback(data);
        await dispatch({type: SET_USER, payload: data});
        await AsyncStorage.setItem('userDetails', JSON.stringify(data));
        dispatch({type: LOADER, payload: false});
      },
      (data: any) => {
        errorCallback(data);
      },
    );
    return;
  };
};

const sendUserDeviceInfo = (
  params: any,
  successCallback: (data: User) => void,
  errorCallback: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    sendUserDeviceInfoApi(
      params,
      (data: User) => {
        successCallback(data);
        dispatch({type: LOADER, payload: false});
      },
      (data: any) => {
        errorCallback(data);
      },
    );
    return;
  };
};

const createUserAccountAction = (
  params: CreateUser,
  successCallback: (data: User) => void,
  errorCallback: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    createUserAccountApi(
      params,
      (data: User) => {
        successCallback(data);
        dispatch({type: LOADER, payload: false});
      },
      (error: any) => {
        toast.show(error.data?.[0]?.message, 2);
        dispatch({type: LOADER, payload: false});
        errorCallback(error);
      },
    );
  };
};

const loginAction = (
  params: LoginUser,
  successCallback: (data: User) => void,
  errorCallback: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    loginUserApi(
      params,
      (data: User) => {
        successCallback(data);
        dispatch({type: LOADER, payload: false});
      },
      (error: any) => {
        toast.show(error.data?.[0]?.message, 2);
        dispatch({type: LOADER, payload: false});
        errorCallback(error);
      },
    );
  };
};

const updateUserAccountAction = (
  userId: string,
  params: UpdateUser,
  successCallback: (data: User) => void,
  errorCallback: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    updateUserAccountApi(
      userId,
      params,
      (data: User) => {
        successCallback(data);
        dispatch({type: LOADER, payload: false});
        toast.show('Profile updated successfully');
      },
      (data: any) => {
        dispatch({type: LOADER, payload: false});
        errorCallback(data);
      },
    );
  };
};

const uploadProfileImageAction = (
  userId: string,
  params: FormData,
  successCallback?: (data: User) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    uploadProfileImageApi(
      userId,
      params,
      (data: User) => {
        if (successCallback) {
          successCallback(data);
        }
        dispatch({type: LOADER, payload: false});
      },
      (data: any) => {
        if (errorCallback) {
          dispatch({type: LOADER, payload: false});
          errorCallback(data);
        }
      },
    );
  };
};

const changePasswordAction = (
  params: ChangePassword,
  successCallback: (data: {token: string}) => void,
  errorCallback: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    changePasswordApi(
      params,
      (data: {token: string}) => {
        toast.show('Password changed');
        successCallback(data);
        dispatch({type: LOADER, payload: false});
      },
      (data: any) => {
        toast.show(data);
        errorCallback(data);
      },
    );
  };
};

const forgotPasswordAction = (
  email: string,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    forgotPsswordApi(
      email,
      data => {
        if (successCallback) {
          successCallback(data);
        }
        dispatch({type: LOADER, payload: false});
      },
      (error: any) => {
        dispatch({type: LOADER, payload: false});
        toast.show(error?.[0]?.message, 2);
        if (errorCallback) {
          errorCallback(error);
        }
      },
    );
  };
};

const verfiOtpAction = (
  email: string,
  verification_code: string,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    verifyOtpApi(
      email,
      verification_code,
      (data: any) => {
        if (successCallback) {
          successCallback(data);
        }
        dispatch({type: LOADER, payload: false});
      },
      (error: any) => {
        dispatch({type: LOADER, payload: false});
        toast.show(error?.[0]?.message, 2);
        if (errorCallback) {
          errorCallback(error);
        }
      },
    );
  };
};

const resetPasswordAction = (
  body: ReestPassword,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    resetPasswordApi(
      body,
      (data: any) => {
        toast.show('Reset successfully');
        if (successCallback) {
          successCallback(data);
        }
        dispatch({type: LOADER, payload: false});
      },
      (error: any) => {
        dispatch({type: LOADER, payload: false});
        toast.show(error?.[0]?.message, 2);
        if (errorCallback) {
          errorCallback(error);
        }
      },
    );
  };
};

const checkEmailExistsAction = (
  params: any,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    checkEmailExistsApi(
      params,
      (data: any) => {
        successCallback(data);
        dispatch({type: LOADER, payload: false});
      },
      (error: any) => {
        dispatch({type: LOADER, payload: false});
        errorCallback(error);
      },
    );
  };
};

const loginWithGoogleAction = (
  email: string,
  id_token: string,
  provider_type: string,
  successCallback: (data: User) => void,
  errorCallback: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    loginWithGoogleApi(
      email,
      id_token,
      provider_type,
      (data: User) => {
        successCallback(data);
        dispatch({type: LOADER, payload: false});
      },
      (error: any) => {
        dispatch({type: LOADER, payload: false});
        toast.show(error?.[0]?.message);
        errorCallback(error);
      },
    );
  };
};

const signupWithGoogleAction = (
  email: string,
  id_token: string,
  successCallback: (data: User) => void,
  errorCallback: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    signupWithGoogleApi(
      email,
      id_token,
      (data: User) => {
        successCallback(data);
        dispatch({type: LOADER, payload: false});
      },
      (error: any) => {
        dispatch({type: LOADER, payload: false});
        toast.show(error?.[0]?.message);
        errorCallback(error);
      },
    );
  };
};

const setNotificationToken = (
  body: any,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  return () => {
    postNotificationToken(
      body,
      (data: any) => {
        successCallback(data);
      },
      (data: any) => {
        errorCallback(data);
      },
    );
    return;
  };
};

const deactivateAccountAction = (
  userId: string,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    deactivateAccountApi(
      userId,
      (data: any) => {
        toast.show(data?.[0]?.message);
        successCallback(data);
        dispatch({type: LOADER, payload: false});
      },
      (error: any) => {
        dispatch({type: LOADER, payload: false});
        toast.show(error?.[0]?.message);
        errorCallback(error);
      },
    );
  };
};

const deleteAccountAction = (
  userId: string,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    deleteAccountApi(
      userId,
      (data: any) => {
        toast.show(data?.[0]?.message);
        successCallback(data);
        dispatch({type: LOADER, payload: false});
      },
      (error: any) => {
        dispatch({type: LOADER, payload: false});
        toast.show(error?.[0]?.message);
        errorCallback(error);
      },
    );
  };
};

const getTermsAndConditions = (
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    termsAndConditionsApi(
      (data: any) => {
        dispatch({type: SET_TERMS_CONDITIONS, payload: data});
        dispatch({type: LOADER, payload: false});
      },
      (error: any) => {
        dispatch({type: LOADER, payload: false});
        toast.show(error?.[0]?.message);
        errorCallback(error);
      },
    );
  };
};

const setSportName = (sportName: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: SET_SPORT_NAME, payload: sportName});
  };
};

const getOtherUserDetailsAction = (
  userId: string,
  successCallback: (data: User) => void,
  errorCallback: (data: any) => void,
) => {
  return () => {
    getOtherUserDetailsApi(
      userId,
      async (data: User) => {
        successCallback(data);
      },
      (data: any) => {
        errorCallback(data);
      },
    );
    return;
  };
};

const getUserFollowersAction = (
  userId: string,
  page: number,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  return () => {
    getUserFollowersApi(
      userId,
      page,
      async (data: any) => {
        successCallback(data);
      },
      (data: any) => {
        errorCallback(data);
      },
    );
    return;
  };
};

const getUserFollowingAction = (
  userId: string,
  page: number,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  return () => {
    getUserFollowingApi(
      userId,
      page,
      async (data: any) => {
        successCallback(data);
      },
      (data: any) => {
        errorCallback(data);
      },
    );
    return;
  };
};

const postFollowUserAction = (
  params: any,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  return () => {
    postUserFollowApi(
      params,
      async (data: any) => {
        successCallback(data);
      },
      (data: any) => {
        errorCallback(data);
      },
    );
    return;
  };
};

const postUnfollowAction = (
  params: any,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  return () => {
    postUnfollowApi(
      params,
      async (data: any) => {
        successCallback(data);
      },
      (data: any) => {
        errorCallback(data);
      },
    );
    return;
  };
};

const postRemoveFolloweAction = (
  params: any,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    postRemoveFollowerApi(
      params,
      async (data: any) => {
        successCallback(data);
      },
      (data: any) => {
        errorCallback(data);
      },
    );
    return;
  };
};

export {
  setUserDetailsAction,
  getUserDetailsAction,
  createUserAccountAction,
  updateUserAccountAction,
  loginAction,
  changePasswordAction,
  forgotPasswordAction,
  verfiOtpAction,
  uploadProfileImageAction,
  resetPasswordAction,
  checkEmailExistsAction,
  loginWithGoogleAction,
  signupWithGoogleAction,
  setNotificationToken,
  deactivateAccountAction,
  deleteAccountAction,
  setSportName,
  sendUserDeviceInfo,
  getTermsAndConditions,
  resetAuthAction,
  getOtherUserDetailsAction,
  getUserFollowersAction,
  getUserFollowingAction,
  postFollowUserAction,
  postUnfollowAction,
  postRemoveFolloweAction,
};
