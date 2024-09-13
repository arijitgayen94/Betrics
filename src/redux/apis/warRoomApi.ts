import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosInstance} from '../../helpers';
import {
  GameLogRequest,
  GetHandicapRequest,
  GetLineupsInjuriesRequest,
  GetLineupsStatsRequest,
  GetMatchupRequest,
  GetProjectionRequest,
  GetSnapshotProjectionRequest,
  GetSnapshotStatsRequest,
  LiveMoveRequest,
  PatchHandicapRequest,
  PlayerRankingRequest,
  PutPowerRankingRequest,
  RankingRequest,
} from '../modals';
import toast from 'react-native-simple-toast';

const getWrMatchupScheduleApi = async (
  type: string,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    let url: string = type === 'nfl' ? '/nfl/schedule' : '';
    axiosInstance
      .get(url)
      .then(response => {
        successCallback(response);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

const getMatchupApi = async (
  params: GetMatchupRequest,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get(`/nfl/odds/week/${params.week_id}/book/${params.book_id}`)
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

// Get Team API Used
const getSnapshotStatsApi = async (
  sportName: string,
  params: GetSnapshotStatsRequest,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post(`/${sportName}/war-room/snapshot/stats`, params)
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

// Get Team API Used
const getSnapshotProjectionApi = async (
  params: GetSnapshotProjectionRequest,
  sportName: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post(`/${sportName}/war-room/snapshot/projection`, params)
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

// Get Teams Player
const getLineupsStatsApi = async (
  sportName: string,
  params: GetLineupsStatsRequest,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post(`/${sportName}/war-room/lineups/stats`, params)
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

const getLineupsProjectionApi = async (
  params: GetProjectionRequest,
  sportName: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post(`${sportName}/war-room/lineups/projection`, params)
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

// Get Teams Player Injuries
const getLineupsInjuriesApi = async (
  params: GetLineupsInjuriesRequest,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get(`/nfl/team/${params.team_id}/player/injuries`)
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
// Get Teams Player Injuries
const postLineupsInjuriesApi = async (
  sportName: string,
  params: GetLineupsInjuriesRequest,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post(`/${sportName}/war-room/lineups/injuries`, params)
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

// Get War Room Handicap
const getWrHandicapApi = async (
  params: GetHandicapRequest,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/nfl/war-room/handicap', params)
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

// Reset Handicap
const resetWrHandicapApi = async (
  id: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get(`/nfl/war-room/handicap/${id}/reset`)
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

// Get War Room Power Ranking
const getWrPowerRankingApi = async (
  sportName: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get(`/${sportName}/war-room/power-ranking`)
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

const putPowerRankingApi = async (
  power_ranking_uuid: string,
  body: Array<PutPowerRankingRequest>,
  sportName: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .put(`/${sportName}/war-room/power-ranking/${power_ranking_uuid}`, body)
      .then(response => {
        if (successCallback) {
          successCallback(response);
        }
      })
      .catch((error: any) => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};

const patchPowerRankingApi = async (
  power_ranking_uuid: string,
  body: Array<PutPowerRankingRequest>,
  sportName: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .patch(`/${sportName}/war-room/power-ranking/${power_ranking_uuid}`, body)
      .then(response => {
        if (successCallback) {
          successCallback(response);
        }
      })
      .catch((error: any) => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};

const patchHandicapApi = async (
  handicap_uuid: string,
  body: PatchHandicapRequest,
  sportName: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .patch(`/${sportName}/war-room/handicap/${handicap_uuid}`, body)
      .then(response => {
        if (successCallback) {
          successCallback(response);
        }
      })
      .catch((error: any) => {
        if (errorCallback) {
          toast.show(error?.[0]?.message, 2);
          errorCallback(error.response);
        }
      });
  }
};

const putHandicapApi = async (
  handicap_uuid: string,
  body: PatchHandicapRequest,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .put(`/nba/war-room/handicap/${handicap_uuid}`, body)
      .then(response => {
        if (successCallback) {
          successCallback(response);
        }
      })
      .catch((error: any) => {
        if (errorCallback) {
          toast.show(error?.[0]?.message, 2);
          errorCallback(error.response);
        }
      });
  }
};

// Reset Ranking
const resetWrRankingApi = async (
  sportName: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .get(`/${sportName}/war-room/power-ranking/reset`)
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

const postSnapshotRankingApi = async (
  body: RankingRequest,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('nfl/war-room/snapshot/team_rating', body)
      .then(response => {
        if (successCallback) {
          successCallback(response);
        }
      })
      .catch((error: any) => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};

const postNbaSnapshotRankingApi = async (
  body: RankingRequest,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('nba/war-room/snapshot/rating', body)
      .then(response => {
        if (successCallback) {
          successCallback(response);
        }
      })
      .catch((error: any) => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};

const postLineupPlayerRankingApi = async (
  body: PlayerRankingRequest,
  sportName: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post(
        `${sportName}/war-room/lineups/${
          sportName === 'nfl' ? 'player_ratings' : 'rating'
        }`,
        body,
      )
      .then(response => {
        if (successCallback) {
          successCallback(response);
        }
      })
      .catch((error: any) => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};

const postLiveMoveApi = async (
  body: LiveMoveRequest,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('nfl/war-room/line-movement/get_line_movement', body)
      .then(response => {
        if (successCallback) {
          successCallback(response);
        }
      })
      .catch((error: any) => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};

const postGameLogApi = async (
  body: GameLogRequest,
  sportName: string,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post(`${sportName}/war-room/snapshot/game_logs`, body)
      .then(response => {
        if (successCallback) {
          successCallback(response);
        }
      })
      .catch((error: any) => {
        if (errorCallback) {
          errorCallback(error.response);
        }
      });
  }
};

export {
  getWrMatchupScheduleApi,
  getMatchupApi,
  getSnapshotStatsApi,
  getLineupsStatsApi,
  getLineupsInjuriesApi,
  getWrHandicapApi,
  getWrPowerRankingApi,
  putPowerRankingApi,
  patchHandicapApi,
  resetWrHandicapApi,
  resetWrRankingApi,
  getSnapshotProjectionApi,
  getLineupsProjectionApi,
  postSnapshotRankingApi,
  postLineupPlayerRankingApi,
  postLiveMoveApi,
  postGameLogApi,
  postNbaSnapshotRankingApi,
  postLineupsInjuriesApi,
  patchPowerRankingApi,
  putHandicapApi,
};
