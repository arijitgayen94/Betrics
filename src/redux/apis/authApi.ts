import {
  ChangePassword,
  CreateUser,
  LoginUser,
  ReestPassword,
  UpdateUser,
} from '../modals';
import {axiosInstance, axiosInstance3} from '../../helpers';
import axios from 'axios';
import {base_url} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserDetailsApi = async (
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get('/user/account')
      .then(response => {
        successCallback(response.data[0]);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const getOtherUserDetailsApi = async (
  userId: string,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get(`/user/account/view_profile/${userId}`)
      .then(response => {
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const getUserFollowersApi = async (
  userId: string,
  page: number,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get(`/social/user-following/${userId}/get_followers?page=${page}`)
      .then(response => {
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const getUserFollowingApi = async (
  userId: string,
  page: number,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get(`/social/user-following/${userId}/get_following?page=${page}`)
      .then(response => {
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const postUserFollowApi = async (
  params: any,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/social/user-following/follow', params)
      .then(response => {
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const sendUserDeviceInfoApi = async (
  params: any,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/utils/device-info', params)
      .then(response => {
        successCallback(response);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const createUserAccountApi = async (
  params: CreateUser,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/user/account/register', params)
      .then(response => {
        successCallback(response);
      })
      .catch(error => {
        errorCallback(error.response);
      });
  }
};

const loginUserApi = async (
  params: LoginUser,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/user/account/login', params)
      .then(response => {
        successCallback(response);
      })
      .catch(error => {
        errorCallback(error.response);
      });
  }
};

const updateUserAccountApi = async (
  userId: string,
  params: UpdateUser,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .patch(`/user/account/${userId}`, params)
      .then(response => {
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(error.response.data);
      });
  }
};

const uploadProfileImageApi = async (
  userId: string,
  params: FormData,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const token = await AsyncStorage.getItem('token');
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    if (token) {
      const config = {
        method: 'post',
        url: `${base_url}/user/account/${userId}/upload_profile`,
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        data: params,
      };

      axios(config)
        .then(response => {
          successCallback(response.data);
        })
        .catch(error => {
          errorCallback(error.response.data);
        });
    }
  }
};

const changePasswordApi = async (
  params: ChangePassword,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/user/account/change_password', params)
      .then(response => {
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(error.response.data);
      });
  }
};

const requestEmailVerification = async (
  params: any,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/user/account/request_email_verification', params)
      .then(response => {
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(error.response.data);
      });
  }
};

const forgotPsswordApi = async (
  email: string,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/user/account/forget_password', {email})
      .then(response => {
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(error.response.data);
      });
  }
};

const verifyOtpApi = async (
  email: string,
  verification_code: string,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/user/account/verify_otp', {email, verification_code})
      .then(response => {
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(error.response.data);
      });
  }
};

const resetPasswordApi = async (
  body: ReestPassword,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/user/account/reset_password', body)
      .then(successCallback)
      .catch(errorCallback);
  }
};

const checkEmailExistsApi = async (
  email: string,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/user/account/check_email_exists', {email})
      .then(response => {
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(error.response.data);
      });
  }
};

const loginWithGoogleApi = async (
  email: string,
  id_token: string,
  provider_type: string,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/user/account/oauth_login', {id_token, email, provider_type})
      .then(response => {
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(error.response.data);
      });
  }
};

const signupWithGoogleApi = async (
  email: string,
  id_token: string,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('user/account/oauth_register', {id_token, email})
      .then(response => {
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(error.response.data);
      });
  }
};

const postNotificationToken = async (
  body: any,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/notification/register_device_token', body)
      .then(response => {
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(error.response.data);
      });
  }
};

const deactivateAccountApi = async (
  userId: string,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .delete(`/user/account/${userId}/deactivate_account`)
      .then(response => {
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(error.response.data);
      });
  }
};

const deleteAccountApi = async (
  userId: string,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .delete(`/user/account/${userId}/delete_account`)
      .then(response => {
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(error.response.data);
      });
  }
};

const termsAndConditionsApi = async (
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get('/utils/terms-and-condition')
      .then(response => {
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(error.response.data);
      });
  }
};

const checkMaintenance = async (
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  axiosInstance3
    .get('maintenance/')
    .then(response => {
      successCallback(response.status);
    })
    .catch(error => {
      errorCallback(error.response.status);
    });
};

const postUnfollowApi = async (
  params: any,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/social/user-following/unfollow', params)
      .then(response => {
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const postRemoveFollowerApi = async (
  params: any,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/social/user-following/remove_follower', params)
      .then(response => {
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

export {
  getUserDetailsApi,
  createUserAccountApi,
  updateUserAccountApi,
  loginUserApi,
  changePasswordApi,
  forgotPsswordApi,
  verifyOtpApi,
  uploadProfileImageApi,
  resetPasswordApi,
  checkEmailExistsApi,
  loginWithGoogleApi,
  signupWithGoogleApi,
  postNotificationToken,
  deactivateAccountApi,
  deleteAccountApi,
  sendUserDeviceInfoApi,
  termsAndConditionsApi,
  checkMaintenance,
  requestEmailVerification,
  getOtherUserDetailsApi,
  getUserFollowersApi,
  getUserFollowingApi,
  postUserFollowApi,
  postUnfollowApi,
  postRemoveFollowerApi,
};
