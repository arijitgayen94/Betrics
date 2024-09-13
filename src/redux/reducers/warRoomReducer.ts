import {
  SET_SNAPSHOT_STATS,
  SET_MATCHUP_SCHEDULE,
  SET_SELECTED_MATCHUP_BOOK,
  SET_SELECTED_SCHEDUAL,
  SET_SNAPSHOT_PROJECTIONS,
  SET_ENGINE_MATCHUP,
  GET_LIVE_MOVE_DATA,
  GET_GAME_LOG_DATA,
  GET_POWER_RANKING,
  RESET_WARROOM_STORE,
} from './../actionTypes/index';
import {SET_MATCHUP} from '../actionTypes';

const INITIAL_STATE = {
  matchup: [],
  projections: [],
  gameLogData: [],
  rankingData: [],
};

const warRoomReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_SNAPSHOT_PROJECTIONS:
      return {
        ...state,
        projections: action.payload,
      };
    case GET_GAME_LOG_DATA:
      return {
        ...state,
        gameLogData: action.payload,
      };
    case GET_POWER_RANKING:
      return {
        ...state,
        rankingData: action.payload,
      };
    case RESET_WARROOM_STORE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

const INITIAL_STATE1 = {
  schedules: [],
  matchups: [],
  engineMatchup: {},
  selectedBook: {},
  selectedSchedule: {},
  liveMove: {},
};

const WrMatchupReducer = (state = INITIAL_STATE1, action: any) => {
  switch (action.type) {
    case SET_MATCHUP_SCHEDULE:
      return {
        ...state,
        schedules: action.payload,
      };
    case SET_MATCHUP:
      return {
        ...state,
        matchups: action.payload,
      };
    case SET_ENGINE_MATCHUP:
      return {
        ...state,
        engineMatchup: action.payload,
      };
    case SET_SELECTED_MATCHUP_BOOK:
      return {
        ...state,
        selectedBook: action.payload,
      };
    case SET_SELECTED_SCHEDUAL:
      return {
        ...state,
        selectedSchedule: action.payload,
      };
    case GET_LIVE_MOVE_DATA:
      return {
        ...state,
        liveMove: action.payload,
      };
    case RESET_WARROOM_STORE:
      return INITIAL_STATE1;
    default:
      return state;
  }
};

const SSS_INITIAL_STATE = {
  snapshotStats: [],
};
const snapshotStatsReducer = (state = SSS_INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_SNAPSHOT_STATS:
      return {
        ...state,
        snapshotStats: action.payload,
      };
    case RESET_WARROOM_STORE:
      return SSS_INITIAL_STATE;
    default:
      return state;
  }
};

export {warRoomReducer, snapshotStatsReducer, WrMatchupReducer};
