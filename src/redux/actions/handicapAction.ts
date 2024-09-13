import {
  getHandicapApi,
  getResetHandicapApi,
  patchUpdateHandicapApi,
} from '../apis';
import {GetHandicapModal, HandicapModal} from '../modals';
import toast from 'react-native-simple-toast';
import {AppDispatch} from '../store';
import {SET_HANDICAP_LOADING} from '../actionTypes';

const getHandicapAction = (
  body: GetHandicapModal,
  sportName: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: SET_HANDICAP_LOADING, payload: true});
    getHandicapApi(
      body,
      sportName,
      result => {
        dispatch({type: SET_HANDICAP_LOADING, payload: false});
        const {data} = result;
        if (successCallback) {
          successCallback(data);
        }
      },
      errorr => {
        dispatch({type: SET_HANDICAP_LOADING, payload: false});
        toast.show(errorr?.[0]?.message);
        if (errorCallback) {
          errorCallback(errorr);
        }
      },
    );
  };
};

const updatetHandicapAction = (
  body: HandicapModal,
  sportName: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: SET_HANDICAP_LOADING, payload: true});
    patchUpdateHandicapApi(
      body,
      sportName,
      result => {
        dispatch({type: SET_HANDICAP_LOADING, payload: false});
        toast.show('Handicap updated successfully');
        const {data} = result;
        if (successCallback) {
          successCallback(data);
        }
      },
      errorr => {
        dispatch({type: SET_HANDICAP_LOADING, payload: false});
        toast.show(errorr?.[0]?.message);
        if (errorCallback) {
          errorCallback(errorr);
        }
      },
    );
  };
};

const resetHandicapAction = (
  uuid: string,
  sportName: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: SET_HANDICAP_LOADING, payload: true});
    getResetHandicapApi(
      uuid,
      sportName,
      result => {
        dispatch({type: SET_HANDICAP_LOADING, payload: false});
        const {data} = result;
        if (successCallback) {
          successCallback(data);
        }
      },
      errorr => {
        dispatch({type: SET_HANDICAP_LOADING, payload: false});
        toast.show(errorr?.[0]?.message, 2);
        if (errorCallback) {
          errorCallback(errorr);
        }
      },
    );
  };
};

export {getHandicapAction, updatetHandicapAction, resetHandicapAction};
