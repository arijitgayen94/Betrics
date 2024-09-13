import {getBetTrackerAPi} from '../apis';
import {BetTrackerModal, BetTrackerFilters} from '../modals';
import toast from 'react-native-simple-toast';
import {AppDispatch} from '../store';
import {LOADER} from '../actionTypes';

const getBetTrackerAction = (
  page: number,
  filters: BetTrackerFilters,
  successCallback?: (response: BetTrackerModal) => void,
  errorCallback?: (error: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    getBetTrackerAPi(
      page,
      filters,
      response => {
        dispatch({type: LOADER, payload: false});
        const {data} = response;
        if (successCallback) {
          successCallback(data);
        }
      },
      error => {
        dispatch({type: LOADER, payload: false});
        toast.show(error?.[0]?.message, 2);
        if (errorCallback) {
          errorCallback(error);
        }
      },
    );
  };
};

export {getBetTrackerAction};
