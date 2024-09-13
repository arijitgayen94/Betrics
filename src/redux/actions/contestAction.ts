import {RESET_CONTEST_STORE, SET_WAGER} from './../actionTypes/index';
import {
  LOADER,
  SET_CONTEST_LIST,
  SET_CONTEST_DETAILS,
  SET_TRIBE,
  SET_TRIBE_LEADERS,
  SET_INDIVIDUAL_LEADERS,
} from '../actionTypes';
import {
  getContestListApi,
  reteriveContestDetailApi,
  joinContestApi,
  createTribeApi,
  joinTribeApi,
  getTribeLeadersApi,
  getIndividualLeadersApi,
  getWagerApi,
} from '../apis';
import {
  ContestWagerFilters,
  getTribeLeadersRequest,
  joinTribeRequest,
} from '../modals';
import {AppDispatch} from '../store';
import toast from 'react-native-simple-toast';
import {getTribeApi, uploadTribeImageApi} from '../apis/contestApi';

const getContestListAction = (
  page: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    getContestListApi(
      page,
      (res: any) => {
        if (res?.status !== 200) {
          toast.show('No match found');
          dispatch({type: SET_CONTEST_LIST, payload: []});
          if (successCallback) {
            successCallback([]);
          }
          dispatch({type: LOADER, payload: false});
          return false;
        }
        const data: any = res.data;
        dispatch({type: SET_CONTEST_LIST, payload: data});
        if (successCallback) {
          successCallback(data);
          dispatch({type: LOADER, payload: false});
        }
      },
      (error: any) => {
        if (errorCallback) {
          dispatch({type: LOADER, payload: false});
          toast.show(error?.[0]?.message, 2);
          errorCallback(error);
        }
      },
    );
    return;
  };
};

const reteriveContestDetailAction = (
  contest_uuid: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    reteriveContestDetailApi(
      contest_uuid,
      (res: any) => {
        if (res?.status !== 200) {
          toast.show('No match found');
          dispatch({type: SET_CONTEST_DETAILS, payload: []});
          if (successCallback) {
            successCallback([]);
          }
          dispatch({type: LOADER, payload: false});
          return false;
        }
        const data: any = res.data;
        dispatch({type: SET_CONTEST_DETAILS, payload: data});
        if (successCallback) {
          successCallback(data);
          dispatch({type: LOADER, payload: false});
        }
      },
      (error: any) => {
        if (errorCallback) {
          dispatch({type: LOADER, payload: false});
          toast.show(error?.[0]?.message, 2);
          errorCallback(error);
        }
      },
    );
    return;
  };
};

const joinContestAction = (
  contest_uuid: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    joinContestApi(
      contest_uuid,
      (res: any) => {
        if (res?.status !== 200) {
          if (successCallback) {
            successCallback([]);
          }
          dispatch({type: LOADER, payload: false});
          return false;
        }
        const data: any = res.data;
        if (successCallback) {
          successCallback(data);
          dispatch({type: LOADER, payload: false});
        }
      },
      (error: any) => {
        if (errorCallback) {
          dispatch({type: LOADER, payload: false});
          toast.show(error?.[0]?.message, 2);
          errorCallback(error);
        }
      },
    );
    return;
  };
};

const createTribeAction = (
  contest_uuid: string,
  params: any,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    createTribeApi(
      contest_uuid,
      params,
      (res: any) => {
        if (res?.status !== 200) {
          if (successCallback) {
            successCallback([]);
          }
          dispatch({type: LOADER, payload: false});
          return false;
        }
        const data: any = res.data;
        if (successCallback) {
          successCallback(data);
          dispatch({type: LOADER, payload: false});
        }
      },
      (error: any) => {
        if (errorCallback) {
          dispatch({type: LOADER, payload: false});
          toast.show(error.data[0].message);
          errorCallback(error.data[0].message);
        }
      },
    );
    return;
  };
};

const joinTribeAction = (
  contest_uuid: string,
  params: joinTribeRequest,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    joinTribeApi(
      contest_uuid,
      params,
      (res: any) => {
        if (res?.status !== 200) {
          if (successCallback) {
            toast.show(res[0].message);
            successCallback([]);
          }
          dispatch({type: LOADER, payload: false});
          return false;
        }
        const data: any = res.data;
        if (successCallback) {
          successCallback(data);
          dispatch({type: LOADER, payload: false});
        }
      },
      (error: any) => {
        if (errorCallback) {
          dispatch({type: LOADER, payload: false});
          toast.show(error.data[0]?.message);
          errorCallback(error.data[0]?.message);
        }
      },
    );
    return;
  };
};

const getTribeAction = (
  contest_uuid: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    getTribeApi(
      contest_uuid,
      (res: any) => {
        if (res?.status !== 200) {
          toast.show('No match found');
          dispatch({type: SET_TRIBE, payload: []});
          if (successCallback) {
            successCallback([]);
          }
          dispatch({type: LOADER, payload: false});
          return false;
        }
        const data: any = res.data;
        dispatch({type: SET_TRIBE, payload: data});
        if (successCallback) {
          successCallback(data);
          dispatch({type: LOADER, payload: false});
        }
      },
      (error: any) => {
        if (errorCallback) {
          dispatch({type: LOADER, payload: false});
          toast.show(error?.[0]?.message, 2);
          errorCallback(error);
        }
      },
    );
    return;
  };
};

const getTribeLeadersAction = (
  contest_uuid: string,
  params: getTribeLeadersRequest,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    getTribeLeadersApi(
      contest_uuid,
      params,
      (res: any) => {
        if (res?.status !== 200) {
          toast.show('No match found');
          dispatch({type: SET_TRIBE_LEADERS, payload: {}});
          if (successCallback) {
            successCallback({});
          }
          dispatch({type: LOADER, payload: false});
          return false;
        }
        const data: any = res.data;
        dispatch({type: SET_TRIBE_LEADERS, payload: data});
        if (successCallback) {
          successCallback(data);
          dispatch({type: LOADER, payload: false});
        }
      },
      (error: any) => {
        if (errorCallback) {
          dispatch({type: LOADER, payload: false});
          toast.show(error?.[0]?.message, 2);
          errorCallback(error);
        }
      },
    );
    return;
  };
};

const getIndividualLeadersAction = (
  contest_uuid: string,
  params: getTribeLeadersRequest,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    getIndividualLeadersApi(
      contest_uuid,
      params,
      (res: any) => {
        if (res?.status !== 200) {
          toast.show('No match found');
          dispatch({type: SET_INDIVIDUAL_LEADERS, payload: []});
          if (successCallback) {
            successCallback([]);
          }
          dispatch({type: LOADER, payload: false});
          return false;
        }
        const data: any = res.data;
        dispatch({type: SET_INDIVIDUAL_LEADERS, payload: data});
        if (successCallback) {
          successCallback(data);
          dispatch({type: LOADER, payload: false});
        }
      },
      (error: any) => {
        if (errorCallback) {
          dispatch({type: LOADER, payload: false});
          toast.show(error?.[0]?.message, 2);
          errorCallback(error);
        }
      },
    );
    return;
  };
};

const getWagerAction = (
  page: number,
  contest_uuid: string,
  filters: ContestWagerFilters,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    getWagerApi(
      page,
      contest_uuid,
      filters,
      (res: any) => {
        if (res?.status !== 200) {
          toast.show('No match found');
          dispatch({type: SET_WAGER, payload: []});
          if (successCallback) {
            successCallback([]);
          }
          dispatch({type: LOADER, payload: false});
          return false;
        }
        const data: any = res.data;
        if (page === 1) {
          dispatch({type: SET_WAGER, payload: data});
        }
        if (successCallback) {
          successCallback(data);
          dispatch({type: LOADER, payload: false});
        }
      },
      (error: any) => {
        if (errorCallback) {
          dispatch({type: LOADER, payload: false});
          toast.show(error?.[0]?.message, 2);
          errorCallback(error);
        }
      },
    );
    return;
  };
};

const patchUpdateTribe = (
  contest_uuid: string,
  tribe_uuid: string,
  params: FormData,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    uploadTribeImageApi(
      contest_uuid,
      tribe_uuid,
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

const resetContestAction = () => {
  return (dispatch: any) => {
    dispatch({type: RESET_CONTEST_STORE});
  };
};

export {
  getContestListAction,
  reteriveContestDetailAction,
  joinContestAction,
  createTribeAction,
  joinTribeAction,
  getTribeAction,
  getTribeLeadersAction,
  getIndividualLeadersAction,
  getWagerAction,
  patchUpdateTribe,
  resetContestAction,
};
