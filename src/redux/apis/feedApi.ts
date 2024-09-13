import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosInstance} from '../../helpers';
import axios from 'axios';
import {base_url} from '../../config';

const getFeedApi = async (
  page: number,
  search: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: Error) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get(
        search.length > 0
          ? `/social/?search=${search}&page=${page}`
          : `/social/?page=${page}`,
      )
      .then((res: any) => {
        if (successCallback) {
          successCallback(res);
        }
      })
      .catch(error => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};
const getFeedDetailsApi = async (
  params: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: Error) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get(`/social/${params}`)
      .then((res: any) => {
        if (successCallback) {
          successCallback(res);
        }
      })
      .catch(error => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};

const getCommentsApi = async (
  params: string,
  page: number,
  successCallback?: (data: any) => void,
  errorCallback?: (error: Error) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get(`/social/feed/${params}/comment?page=${page}`)
      .then((res: any) => {
        if (successCallback) {
          successCallback(res);
        }
      })
      .catch(error => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};
const postLikeUnlikeApi = async (
  params: any,
  successCallback?: (data: any) => void,
  errorCallback?: (error: Error) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/social/like_feed', params)
      .then((res: any) => {
        if (successCallback) {
          successCallback(res);
        }
      })
      .catch(error => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};

const postReportApi = async (
  postId: string,
  params: any,
  successCallback?: (data: any) => void,
  errorCallback?: (error: Error) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post(`/social/${postId}/report`, params)
      .then((res: any) => {
        if (successCallback) {
          successCallback(res);
        }
      })
      .catch(error => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};

const commentReportApi = async (
  postId: string,
  commentId: string,
  params: any,
  successCallback?: (data: any) => void,
  errorCallback?: (error: Error) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post(`/social/${postId}/comment/${commentId}/report`, params)
      .then((res: any) => {
        if (successCallback) {
          successCallback(res);
        }
      })
      .catch(error => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};
const postCommentApi = async (
  params: string,
  body: any,
  successCallback?: (data: any) => void,
  errorCallback?: (error: Error) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post(`/social/feed/${params}/comment`, body)
      .then((res: any) => {
        if (successCallback) {
          successCallback(res);
        }
      })
      .catch(error => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};

const deleteCommentApi = async (
  params: string,
  commentId: string,
  body: any,
  successCallback?: (data: any) => void,
  errorCallback?: (error: Error) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .delete(`/social/feed/${params}/comment/${commentId}`, body)
      .then((res: any) => {
        if (successCallback) {
          successCallback(res);
        }
      })
      .catch(error => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};

const editCommentApi = async (
  params: string,
  commentId: string,
  body: any,
  successCallback?: (data: any) => void,
  errorCallback?: (error: Error) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .put(`/social/feed/${params}/comment/${commentId}`, body)
      .then((res: any) => {
        if (successCallback) {
          successCallback(res);
        }
      })
      .catch(error => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};
const createNewPostApi = async (
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
        url: `${base_url}/social/user-dashboard`,
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

const editPostApi = async (
  params: string,
  body: any,
  successCallback?: (data: any) => void,
  errorCallback?: (error: Error) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .patch(`/social/user-dashboard/${params}`, body)
      .then((res: any) => {
        if (successCallback) {
          successCallback(res.data);
        }
      })
      .catch(error => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};
const getUserDashboardApi = async (
  params: number,
  successCallback?: (data: any) => void,
  errorCallback?: (error: Error) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get(`/social/user-dashboard?page=${params}`)
      .then((res: any) => {
        if (successCallback) {
          successCallback(res);
        }
      })
      .catch(error => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};

const deletePostApi = async (
  params: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: Error) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .delete(`/social/user-dashboard/${params}`)
      .then((res: any) => {
        if (successCallback) {
          successCallback(res);
        }
      })
      .catch(error => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};

export {
  getFeedApi,
  getFeedDetailsApi,
  getCommentsApi,
  postLikeUnlikeApi,
  postReportApi,
  postCommentApi,
  createNewPostApi,
  commentReportApi,
  getUserDashboardApi,
  editPostApi,
  deletePostApi,
  deleteCommentApi,
  editCommentApi,
};
