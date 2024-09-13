import {
  GET_FEEDS,
  LOADER,
  LOADER_FEED,
  RESET_FEED_STORE,
  UPDATE_FEEDS,
} from '../actionTypes';
import {
  commentReportApi,
  createNewPostApi,
  deleteCommentApi,
  deletePostApi,
  editCommentApi,
  editPostApi,
  getCommentsApi,
  getFeedApi,
  getFeedDetailsApi,
  getUserDashboardApi,
  postCommentApi,
  postLikeUnlikeApi,
  postReportApi,
} from '../apis';
import {AppDispatch} from '../store';
import toast from 'react-native-simple-toast';

const getFeedsAction = (
  page: number,
  search: string,
  loader?: boolean,
  successCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER_FEED, payload: page === 1 && loader ? true : false});
    getFeedApi(
      page,
      search,
      (res: any) => {
        const {data} = res;
        if (page === 1) {
          dispatch({type: GET_FEEDS, payload: data.results});
        } else {
          dispatch({type: UPDATE_FEEDS, payload: data.results});
        }
        dispatch({type: LOADER_FEED, payload: false});
        if (successCallback) {
          successCallback(data.pagination);
        }
      },
      (error: any) => {
        dispatch({type: LOADER_FEED, payload: false});
        toast.show(error.data?.[0]?.message, 5);
      },
    );
    return;
  };
};

const updateFeeds = (data: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: GET_FEEDS, payload: data});
  };
};

const getFeedsDetailsAction = (
  params: string,
  successCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: false});
    getFeedDetailsApi(
      params,
      (res: any) => {
        const {data} = res;
        dispatch({type: LOADER, payload: false});
        if (successCallback) {
          successCallback(data);
        }
      },
      (error: any) => {
        toast.show(error.data?.[0]?.message, 5);
      },
    );
    return;
  };
};

const getCommentsAction = (
  params: string,
  page: number,
  successCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: page === 1 ? true : false});
    getCommentsApi(
      params,
      page,
      (res: any) => {
        const {data} = res;
        dispatch({type: LOADER, payload: false});
        if (successCallback) {
          successCallback(data);
        }
      },
      (error: any) => {
        dispatch({type: LOADER, payload: false});
        toast.show(error.data?.[0]?.message, 5);
      },
    );
    return;
  };
};
// Like unlike in a post
const postLikeUnlikeAction = (
  params: any,
  successCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: false});
    postLikeUnlikeApi(
      params,
      (res: any) => {
        const {data} = res;
        dispatch({type: LOADER, payload: false});
        if (successCallback) {
          successCallback(data);
        }
      },
      (error: any) => {
        toast.show(error.data?.[0]?.message, 5);
      },
    );
    return;
  };
};

// report for a post
const postReportAction = (
  postId: string,
  params: any,
  successCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: false});
    postReportApi(
      postId,
      params,
      (res: any) => {
        const {data} = res;
        dispatch({type: LOADER, payload: false});
        if (successCallback) {
          successCallback(data);
        }
      },
      (error: any) => {
        toast.show(error.data?.[0]?.message, 5);
      },
    );
    return;
  };
};
// report for a post
const commentReportAction = (
  postId: string,
  commentId: string,
  params: any,
  successCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: false});
    commentReportApi(
      postId,
      commentId,
      params,
      (res: any) => {
        const {data} = res;
        dispatch({type: LOADER, payload: false});
        if (successCallback) {
          successCallback(data);
        }
      },
      (error: any) => {
        toast.show(error.data?.[0]?.message, 5);
      },
    );
    return;
  };
};
const postCommentAction = (
  params: string,
  body: any,
  successCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: false});
    postCommentApi(
      params,
      body,
      (res: any) => {
        const {data} = res;
        dispatch({type: LOADER, payload: false});
        if (successCallback) {
          successCallback(data);
        }
      },
      (error: any) => {
        toast.show(error.data?.[0]?.message, 5);
      },
    );
    return;
  };
};

const deleteCommentAction = (
  params: string,
  commentId: string,
  body: any,
  successCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: false});
    deleteCommentApi(
      params,
      commentId,
      body,
      (res: any) => {
        const {data} = res;
        dispatch({type: LOADER, payload: false});
        if (successCallback) {
          successCallback(data);
        }
      },
      (error: any) => {
        toast.show(error.data?.[0]?.message, 5);
      },
    );
    return;
  };
};

const editCommentAction = (
  params: string,
  commentId: string,
  body: any,
  successCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: false});
    editCommentApi(
      params,
      commentId,
      body,
      (res: any) => {
        const {data} = res;
        dispatch({type: LOADER, payload: false});
        if (successCallback) {
          successCallback(data);
        }
      },
      (error: any) => {
        toast.show(error.data?.[0]?.message, 5);
      },
    );
    return;
  };
};

const createNewPostAction = (
  params: FormData,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    createNewPostApi(
      params,
      (data: any) => {
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

const editPostAction = (
  params: string,
  body: any,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    editPostApi(
      params,
      body,
      (data: any) => {
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

const getUserDashboardAction = (
  params: number,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    getUserDashboardApi(
      params,
      (response: any) => {
        if (successCallback) {
          successCallback(response.data);
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

const deletePostAction = (
  params: string,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: false});
    deletePostApi(
      params,
      (response: any) => {
        if (successCallback) {
          successCallback(response.data);
        }
        dispatch({type: LOADER, payload: false});
      },
      (error: any) => {
        if (errorCallback) {
          dispatch({type: LOADER, payload: false});
          toast.show(error.data?.[0]?.message, 5);
        }
      },
    );
  };
};

const resetFeedsAction = () => {
  return (dispatch: any) => {
    dispatch({type: RESET_FEED_STORE});
  };
};

export {
  getFeedsAction,
  updateFeeds,
  getFeedsDetailsAction,
  getCommentsAction,
  postLikeUnlikeAction,
  postReportAction,
  postCommentAction,
  createNewPostAction,
  commentReportAction,
  getUserDashboardAction,
  editPostAction,
  deletePostAction,
  deleteCommentAction,
  editCommentAction,
  resetFeedsAction,
};
