import {base_url} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {axiosInstance} from '../../helpers';
import {
  ContestWagerFilters,
  getTribeLeadersRequest,
  joinTribeRequest,
} from '../modals';
import toast from 'react-native-simple-toast';

const getContestListApi = async (
  page: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get(`/contest/?page=${page}`)
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

const reteriveContestDetailApi = async (
  contest_uuid: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get(`/contest/${contest_uuid}`)
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

const joinContestApi = async (
  contest_uuid: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get(`/contest/${contest_uuid}/join_contest`)
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

const createTribeApi = async (
  contest_uuid: string,
  params: any,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post(`/contest/${contest_uuid}/create_tribe`, params)
      .then(response => {
        if (successCallback) {
          successCallback(response);
        }
      })
      .catch(error => {
        if (errorCallback) {
          toast.show(error?.[0]?.message, 2);
          errorCallback(error.response);
        }
      });
  }
};

const joinTribeApi = async (
  contest_uuid: string,
  params: joinTribeRequest,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post(`/contest/${contest_uuid}/join_tribe`, params)
      .then(response => {
        if (successCallback) {
          successCallback(response);
        }
      })
      .catch(error => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};

const getTribeLeadersApi = async (
  contest_uuid: string,
  params: getTribeLeadersRequest,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get(
        `/contest/${contest_uuid}/get_tribe_leaders?page=${params.page}&public=${params.public}&name=${params.name}`,
      )
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

const getTribeApi = async (
  contest_uuid: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get(`/contest/${contest_uuid}/get_tribe`)
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

const getIndividualLeadersApi = async (
  contest_uuid: string,
  params: getTribeLeadersRequest,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get(
        `/contest/${contest_uuid}/get_individual_leaders?page=${params.page}&public=${params.public}&name=${params.name}`,
      )
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

const getWagerApi = async (
  page: number,
  contest_uuid: string,
  filters: ContestWagerFilters,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post(`/contest/${contest_uuid}/get_wager?page=${page}`, filters)
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

const uploadTribeImageApi = async (
  contest_uuid: string,
  tribe_uuid: string,
  params: FormData,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const token = await AsyncStorage.getItem('token');
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    if (token) {
      const config = {
        method: 'patch',
        url: `${base_url}/contest/${contest_uuid}/update_tribe/${tribe_uuid}`,
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

export {
  getContestListApi,
  reteriveContestDetailApi,
  joinContestApi,
  createTribeApi,
  joinTribeApi,
  getTribeApi,
  getTribeLeadersApi,
  getIndividualLeadersApi,
  getWagerApi,
  uploadTribeImageApi,
};
