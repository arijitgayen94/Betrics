import {
  LOADER,
  RESET_MATCHUP_STORE,
  SET_ENGINE_MATCHUP,
  SET_MATCHUP,
  SET_MATCHUP_LINE_VIEW_ENGINE_FILTER_OPTION,
  SET_MATCHUP_LINE_VIEW_FILTER_OPTION,
  SET_MATCHUP_LOADING,
  SET_MATCHUP_SCHEDULE,
  SET_SELECTED_MATCHUP_BOOK,
  SET_SELECTED_SCHEDUAL,
  SET_WAR_ROOM_MATCHUP,
  UPDATE_MATCHUP,
} from '../actionTypes';
import {
  getMatchupScheduleApi,
  getMachupApi,
  getMachupEngineCalculationApi,
  getBetInfoApi,
  getRetriveMatchupViewApi,
  getRetriveNflMatchupViewApi,
  getMachupBestLineApi,
} from '../apis';
import {
  EngineMatchup,
  LineViewFilterOptionModal,
  Matchup,
  Schedule,
  Sportsbook,
} from '../modals';
import {AppDispatch} from '../store';
import toast from 'react-native-simple-toast';

const getMatchupScheduleAction = (
  type: string,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    getMatchupScheduleApi(
      type,
      (res: any) => {
        let {data} = res;
        data?.map((x: any) => {
          x.display1 = x.display?.split(' ')[0];
          x.display2 = x.display?.split(' ')[1];
          return x;
        });
        dispatch({type: SET_MATCHUP_SCHEDULE, payload: data});
        if (successCallback) {
          successCallback(data);
        }
        dispatch({type: LOADER, payload: false});
      },
      (data: any) => {
        if (errorCallback) {
          errorCallback(data);
          dispatch({type: LOADER, payload: false});
        }
      },
    );
    return;
  };
};

const getMachupBestLineAction = (
  params: any,
  page: number,
  game: string,
  loading: boolean = true,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    if (loading) {
      dispatch({type: SET_MATCHUP_LOADING, payload: true});
    }
    getMachupBestLineApi(
      params,
      page,
      game,
      (res: any) => {
        if (res?.status !== 200) {
          toast.show('No match found');
          dispatch({type: SET_MATCHUP, payload: []});
          dispatch({type: SET_MATCHUP_LOADING, payload: false});

          if (successCallback) {
            successCallback([]);
          }
          return false;
        }
        const data: Matchup = res.data;
        if (page === 1) {
          dispatch({type: SET_MATCHUP, payload: data});
        } else {
          dispatch({type: UPDATE_MATCHUP, payload: data});
        }
        dispatch({type: SET_MATCHUP_LOADING, payload: false});
        if (successCallback) {
          successCallback(data);
        }
      },
      error => {
        if (errorCallback) {
          dispatch({type: SET_MATCHUP_LOADING, payload: false});
          toast.show(error?.[0]?.message, 2);
          errorCallback(error);
        }
      },
    );
    return;
  };
};

const getMachupAction = (
  params: any,
  page: number,
  game: string,
  loading: boolean = true,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    if (loading) {
      dispatch({type: SET_MATCHUP_LOADING, payload: true});
    }
    getMachupApi(
      params,
      page,
      game,
      (res: any) => {
        if (res?.status !== 200) {
          toast.show('No match found');
          dispatch({type: SET_MATCHUP, payload: []});
          dispatch({type: SET_MATCHUP_LOADING, payload: false});

          if (successCallback) {
            successCallback([]);
          }
          return false;
        }
        const data: Matchup = res.data;
        if (page === 1) {
          dispatch({type: SET_MATCHUP, payload: data});
        } else {
          dispatch({type: UPDATE_MATCHUP, payload: data});
        }
        dispatch({type: SET_MATCHUP_LOADING, payload: false});
        if (successCallback) {
          successCallback(data);
        }
      },
      error => {
        if (errorCallback) {
          dispatch({type: SET_MATCHUP_LOADING, payload: false});
          toast.show(error?.[0]?.message, 2);
          errorCallback(error);
        }
      },
    );
    return;
  };
};

const getMachupEngineCalculationAction = (
  page: number,
  params: {
    week_id: number;
    book_id: string;
  },
  loading: boolean,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    if (loading) {
      dispatch({type: SET_MATCHUP_LOADING, payload: true});
    }
    getMachupEngineCalculationApi(
      page,
      params,
      (res: any) => {
        if (res?.status !== 200) {
          toast.show('No match found');
          dispatch({type: SET_MATCHUP_LOADING, payload: false});
          dispatch({type: SET_MATCHUP, payload: []});
          if (successCallback) {
            successCallback([]);
          }
          return false;
        }
        const data: EngineMatchup = res.data;
        dispatch({type: SET_ENGINE_MATCHUP, payload: data});
        dispatch({type: SET_MATCHUP_LOADING, payload: false});
        if (successCallback) {
          successCallback(data);
        }
      },
      error => {
        if (errorCallback) {
          dispatch({type: SET_MATCHUP_LOADING, payload: false});
          toast.show(error?.[0]?.message, 2);
          errorCallback(error);
        }
      },
    );
    return;
  };
};

const setSelectedMatchupBookAction = (book: Sportsbook) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: SET_SELECTED_MATCHUP_BOOK, payload: book});
  };
};

const setSelectedMatchupSchedualAction = (schedule: Schedule) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: SET_SELECTED_SCHEDUAL, payload: schedule});
  };
};

const setMatchupLineViewFilterOptionsAction = (
  payload: Array<LineViewFilterOptionModal>,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: SET_MATCHUP_LINE_VIEW_FILTER_OPTION, payload: payload});
  };
};

const setMatchupLineViewEngineFilterOptionsAction = (
  payload: Array<LineViewFilterOptionModal>,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: SET_MATCHUP_LINE_VIEW_ENGINE_FILTER_OPTION,
      payload: payload,
    });
  };
};

const getRetriveMatchupViewAction = (
  body: any = {},
  sportName: string,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    getRetriveMatchupViewApi(
      body,
      sportName,
      (res: any) => {
        if (res?.status !== 200) {
          toast.show('No match found');
          dispatch({type: SET_WAR_ROOM_MATCHUP, payload: []});
          if (successCallback) {
            successCallback([]);
          }
          return false;
        }
        const data: any = res.data;
        dispatch({type: SET_WAR_ROOM_MATCHUP, payload: data});
        if (successCallback) {
          successCallback(data);
        }
      },
      error => {
        if (errorCallback) {
          toast.show(error?.[0]?.message, 2);
          errorCallback(error);
        }
      },
    );
    return;
  };
};
const getRetriveNflMatchupViewAction = (
  body: any = {},
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    getRetriveNflMatchupViewApi(
      body,
      (res: any) => {
        if (res?.status !== 200) {
          toast.show('No match found');
          dispatch({type: SET_WAR_ROOM_MATCHUP, payload: []});
          if (successCallback) {
            successCallback([]);
          }
          return false;
        }
        const data: any = res.data;
        dispatch({type: SET_WAR_ROOM_MATCHUP, payload: data});
        if (successCallback) {
          successCallback(data);
        }
      },
      error => {
        if (errorCallback) {
          toast.show(error?.[0]?.message, 2);
          errorCallback(error);
        }
      },
    );
    return;
  };
};

const getBetInfoAction = (
  body: any = {},
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return () => {
    getBetInfoApi(
      body,
      (res: any) => {
        if (res?.status !== 200) {
          if (successCallback) {
            successCallback([]);
          }
          return false;
        }
        if (successCallback) {
          successCallback(res.data);
        }
      },
      error => {
        if (errorCallback) {
          toast.show('No bets found!', 2);
          errorCallback(error);
        }
      },
    );
    return;
  };
};

const resetMatchUpAction = () => {
  return (dispatch: any) => {
    dispatch({type: RESET_MATCHUP_STORE});
  };
};

export {
  getMachupAction,
  getMatchupScheduleAction,
  setSelectedMatchupBookAction,
  setSelectedMatchupSchedualAction,
  setMatchupLineViewFilterOptionsAction,
  setMatchupLineViewEngineFilterOptionsAction,
  getMachupEngineCalculationAction,
  getRetriveMatchupViewAction,
  getBetInfoAction,
  getRetriveNflMatchupViewAction,
  resetMatchUpAction,
  getMachupBestLineAction,
};
