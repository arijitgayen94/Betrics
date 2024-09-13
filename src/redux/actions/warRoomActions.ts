import {
  GET_GAME_LOG_DATA,
  GET_LINEUP_RANKING,
  GET_LIVE_MOVE_DATA,
  GET_SNAPSHOT_RANKING,
  RESET_WARROOM_STORE,
  SET_LINEUPS_PROJECTION,
  SET_SNAPSHOT_PROJECTIONS,
} from './../actionTypes/index';
import {
  LOADER,
  SET_LINEUPS_STATS,
  SET_SNAPSHOT_STATS,
  GET_POWER_RANKING,
  SET_LINEUPS_INJURIES,
} from '../actionTypes';
import {
  getLineupsInjuriesApi,
  getLineupsProjectionApi,
  getLineupsStatsApi,
  getSnapshotProjectionApi,
  getSnapshotStatsApi,
  getWrPowerRankingApi,
  patchHandicapApi,
  postGameLogApi,
  postLineupPlayerRankingApi,
  postLiveMoveApi,
  postLineupsInjuriesApi,
  postNbaSnapshotRankingApi,
  postSnapshotRankingApi,
  putPowerRankingApi,
  resetWrRankingApi,
} from '../apis';
import {
  GetLineupsInjuriesRequest,
  GetLineupsStatsRequest,
  GetSnapshotProjectionRequest,
  GetSnapshotStatsRequest,
  PatchHandicapRequest,
  PutPowerRankingRequest,
  GetProjectionRequest,
  RankingRequest,
  PlayerRankingRequest,
  LiveMoveRequest,
  GameLogRequest,
} from '../modals';
import {AppDispatch} from '../store';
import toast from 'react-native-simple-toast';

const getSnapshotStatsAction = (
  params: GetSnapshotStatsRequest,
  sportName: string,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    getSnapshotStatsApi(
      sportName,
      params,
      (res: any) => {
        if (res?.status !== 200) {
          toast.show('No match found');
          dispatch({type: SET_SNAPSHOT_STATS, payload: []});
          if (successCallback) {
            successCallback([]);
          }
          dispatch({type: LOADER, payload: false});
          return false;
        }
        const data: any = res.data;
        dispatch({type: SET_SNAPSHOT_STATS, payload: data});
        if (successCallback) {
          successCallback(data);
          dispatch({type: LOADER, payload: false});
        }
      },
      error => {
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

const getSnapshotProjectionAction = (
  params: GetSnapshotProjectionRequest,
  sportName: string,
  successCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    getSnapshotProjectionApi(
      params,
      sportName,
      (res: any) => {
        if (res?.status !== 200) {
          toast.show('Projections not found');
          dispatch({type: SET_SNAPSHOT_PROJECTIONS, payload: []});
          if (successCallback) {
            successCallback([]);
          }
          dispatch({type: LOADER, payload: false});
          return false;
        }
        const data: any = res.data;
        dispatch({type: SET_SNAPSHOT_PROJECTIONS, payload: data});
        if (successCallback) {
          successCallback(data);
          dispatch({type: LOADER, payload: false});
        }
      },
      error => {
        if (error) {
          dispatch({type: LOADER, payload: false});
          toast.show(error?.data[0]?.message, 2);
        }
      },
    );
    return;
  };
};

const getLineupsStatsAction = (
  params: GetLineupsStatsRequest,
  sportName: string,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    getLineupsStatsApi(
      sportName,
      params,
      (res: any) => {
        if (res?.status !== 200) {
          toast.show('No match found');
          dispatch({type: SET_LINEUPS_STATS, payload: []});
          if (successCallback) {
            successCallback([]);
          }
          dispatch({type: LOADER, payload: false});
          return false;
        }
        const data: any = res.data;
        dispatch({type: SET_LINEUPS_STATS, payload: data});
        if (successCallback) {
          successCallback(data);
          dispatch({type: LOADER, payload: false});
        }
      },
      error => {
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

const getProjectionAction = (
  params: GetProjectionRequest,
  sportName: string,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    getLineupsProjectionApi(
      params,
      sportName,
      (res: any) => {
        if (res?.status !== 200) {
          toast.show('No match found');
          dispatch({type: SET_LINEUPS_PROJECTION, payload: []});
          if (successCallback) {
            successCallback([]);
          }
          dispatch({type: LOADER, payload: false});
          return false;
        }
        const data: any = res.data;
        dispatch({type: SET_LINEUPS_PROJECTION, payload: data});
        if (successCallback) {
          successCallback(data);
          dispatch({type: LOADER, payload: false});
        }
      },
      error => {
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

const getLineupsInjuriesAction = (
  params: GetLineupsInjuriesRequest,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    getLineupsInjuriesApi(
      params,
      (res: any) => {
        if (res?.status !== 200) {
          toast.show('No match found');
          dispatch({type: SET_LINEUPS_INJURIES, payload: []});
          if (successCallback) {
            successCallback([]);
          }
          dispatch({type: LOADER, payload: false});
          return false;
        }
        const data: any = res.data;
        dispatch({type: SET_LINEUPS_INJURIES, payload: data});
        if (successCallback) {
          successCallback(data);
          dispatch({type: LOADER, payload: false});
        }
      },
      error => {
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

const postLineupsInjuriesAction = (
  sportName: string,
  params: GetLineupsInjuriesRequest,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    postLineupsInjuriesApi(
      sportName,
      params,
      (res: any) => {
        if (res?.status !== 200) {
          toast.show('No match found');
          dispatch({type: SET_LINEUPS_INJURIES, payload: []});
          if (successCallback) {
            successCallback([]);
          }
          dispatch({type: LOADER, payload: false});
          return false;
        }
        const data: any = res.data;
        dispatch({type: SET_LINEUPS_INJURIES, payload: data});
        if (successCallback) {
          successCallback(data);
          dispatch({type: LOADER, payload: false});
        }
      },
      error => {
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

const getPowerRankingAction = (
  sportName: string,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    getWrPowerRankingApi(
      sportName,
      (res: any) => {
        if (res?.status !== 200) {
          const {data} = res;
          dispatch({type: GET_POWER_RANKING, payload: data.count});
          if (successCallback) {
            successCallback([]);
          }
          dispatch({type: LOADER, payload: false});
          return false;
        }
        const data: any = res.data;
        dispatch({type: GET_POWER_RANKING, payload: data});
        if (successCallback) {
          successCallback(data);
          dispatch({type: LOADER, payload: false});
        }
      },
      error => {
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

const putPowerRankingAction = (
  power_ranking_uuid: string,
  body: Array<PutPowerRankingRequest>,
  sportName: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    putPowerRankingApi(
      power_ranking_uuid,
      body,
      sportName,
      (res: any) => {
        const {data} = res;
        toast.show('Ranking Updated successfully');
        dispatch({type: LOADER, payload: false});
        if (successCallback) {
          successCallback(data);
        }
      },
      (error: any) => {
        toast.show(error.data[0]?.message);
        dispatch({type: LOADER, payload: false});
        if (errorCallback) {
          errorCallback(error);
        }
      },
    );
  };
};

const patchHandicapAction = (
  handicap_uuid: string,
  body: PatchHandicapRequest,
  sportName: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    patchHandicapApi(
      handicap_uuid,
      body,
      sportName,
      (data: any) => {
        if (successCallback) {
          successCallback(data);
        }
      },
      (error: any) => {
        if (errorCallback) {
          errorCallback(error);
        }
      },
    );
  };
};

const resetRankingAction = (
  sportName: string,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    resetWrRankingApi(
      sportName,
      (res: any) => {
        if (res?.status !== 200) {
          toast.show('No match found');
          dispatch({type: GET_POWER_RANKING, payload: {}});
          if (successCallback) {
            successCallback({});
          }
          dispatch({type: LOADER, payload: false});
          return false;
        }
        const data: any = res.data;
        dispatch({type: GET_POWER_RANKING, payload: data});
        if (successCallback) {
          successCallback(data);
          dispatch({type: LOADER, payload: false});
        }
      },
      error => {
        if (errorCallback) {
          dispatch({type: LOADER, payload: false});
          // toast.show(error?.[0]?.message, 2);
          errorCallback(error);
        }
      },
    );
    return;
  };
};

const postSnapshotRankingAction = (
  body: RankingRequest,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    postSnapshotRankingApi(
      body,
      (res: any) => {
        if (res?.status !== 200) {
          toast.show('No match found');
          dispatch({type: GET_SNAPSHOT_RANKING, payload: {}});
          if (successCallback) {
            successCallback({});
          }
          dispatch({type: LOADER, payload: false});
          return false;
        }
        const data: any = res.data;
        dispatch({type: GET_SNAPSHOT_RANKING, payload: data});
        if (successCallback) {
          successCallback(data);
          dispatch({type: LOADER, payload: false});
        }
      },
      error => {
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

const postNbaSnapshotRankingAction = (
  body: RankingRequest,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    postNbaSnapshotRankingApi(
      body,
      (res: any) => {
        if (res?.status !== 200) {
          toast.show('No match found');
          dispatch({type: GET_SNAPSHOT_RANKING, payload: {}});
          if (successCallback) {
            successCallback({});
          }
          dispatch({type: LOADER, payload: false});
          return false;
        }
        const data: any = res.data;
        dispatch({type: GET_SNAPSHOT_RANKING, payload: data});
        if (successCallback) {
          successCallback(data);
          dispatch({type: LOADER, payload: false});
        }
      },
      error => {
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

const postLineupPlayerRankingAction = (
  body: PlayerRankingRequest,
  sportName: string,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    postLineupPlayerRankingApi(
      body,
      sportName,
      (res: any) => {
        if (res?.status !== 200) {
          dispatch({type: GET_LINEUP_RANKING, payload: {}});
          if (successCallback) {
            successCallback({});
          }
          dispatch({type: LOADER, payload: false});
          return false;
        }
        const data: any = res.data;
        dispatch({type: GET_LINEUP_RANKING, payload: data});
        if (successCallback) {
          successCallback(data);
          dispatch({type: LOADER, payload: false});
        }
      },
      error => {
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

const postLiveMoveAction = (
  body: LiveMoveRequest,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    postLiveMoveApi(
      body,
      (res: any) => {
        if (res?.status !== 200) {
          dispatch({type: GET_LIVE_MOVE_DATA, payload: {}});
          if (successCallback) {
            successCallback({});
          }
          dispatch({type: LOADER, payload: false});
          return false;
        }
        const data: any = res.data;
        dispatch({type: GET_LIVE_MOVE_DATA, payload: data});
        if (successCallback) {
          successCallback(data);
          dispatch({type: LOADER, payload: false});
        }
      },
      error => {
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

const postGameLogAction = (
  body: GameLogRequest,
  sportName: string,
  successCallback?: (data: any) => void,
) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADER, payload: true});
    postGameLogApi(
      body,
      sportName,
      (res: any) => {
        if (res?.status !== 200) {
          dispatch({type: GET_GAME_LOG_DATA, payload: {}});
          if (successCallback) {
            successCallback({});
          }
          dispatch({type: LOADER, payload: false});
          return false;
        }
        const data: any = res.data;
        dispatch({type: GET_GAME_LOG_DATA, payload: data});
        dispatch({type: LOADER, payload: false});
        if (successCallback) {
          successCallback(data);
        }
      },
      error => {
        dispatch({type: LOADER, payload: false});
        toast.show(error?.[0]?.message, 2);
      },
    );
    return;
  };
};

const resetWarRoomAction = () => {
  return (dispatch: any) => {
    dispatch({type: RESET_WARROOM_STORE});
  };
};

export {
  getSnapshotStatsAction,
  getLineupsStatsAction,
  getProjectionAction,
  getLineupsInjuriesAction,
  putPowerRankingAction,
  patchHandicapAction,
  getPowerRankingAction,
  resetRankingAction,
  getSnapshotProjectionAction,
  postSnapshotRankingAction,
  postLineupPlayerRankingAction,
  postLiveMoveAction,
  postGameLogAction,
  postNbaSnapshotRankingAction,
  postLineupsInjuriesAction,
  resetWarRoomAction,
};
