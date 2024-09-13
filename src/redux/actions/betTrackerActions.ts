import {RESET_FILTERS, SET_FILTERS} from '../actionTypes';
import {User} from '../modals';

const setFiltersAction = (payload: User) => {
  return (dispatch: any) => {
    dispatch({type: SET_FILTERS, payload: payload});
  };
};

const resetFiltersAction = () => {
  return (dispatch: any) => {
    dispatch({type: RESET_FILTERS});
  };
};

export {setFiltersAction, resetFiltersAction};
