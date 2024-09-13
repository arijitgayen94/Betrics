import {
  RESET_MATCHUP_STORE,
  SET_HANDICAP_LOADING,
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

const INITIAL_STATE = {
  schedules: [],
  matchups: [],
  warRoomMatchUp: {},
  selectedBook: {},
  selectedSchedule: {},
  lineViewOptions: [
    {
      id: 1,
      display: 'Odds',
      isSelected: true,
    },
    {
      id: 3,
      display: 'Engine',
      isSelected: false,
    },
  ],
  lineViewEngineOptions: [
    {id: 1, display: 'Pred', isSelected: true, key: 'prediction'},
    {id: 2, display: 'Prob', isSelected: false, key: 'probability'},
    {id: 3, display: 'Edge', isSelected: false, key: 'edge'},
    {id: 4, display: 'EV', isSelected: false, key: 'EV'},
    {id: 5, display: 'Kelly', isSelected: false, key: 'kelly'},
  ],
  isHandicapLoading: false,
  isMatchupLoading: false,
};

const matchupReducer = (state = INITIAL_STATE, action: any) => {
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
    case UPDATE_MATCHUP:
      return {
        ...state,
        matchups: {
          pagination: action.payload.pagination,
          count: action.payload.count,
          results: [...state.matchups?.results, ...action.payload.results],
        },
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
    case SET_MATCHUP_LINE_VIEW_FILTER_OPTION:
      return {
        ...state,
        lineViewOptions: action.payload,
      };
    case SET_MATCHUP_LINE_VIEW_ENGINE_FILTER_OPTION:
      return {
        ...state,
        lineViewEngineOptions: action.payload,
      };
    case SET_HANDICAP_LOADING:
      return {
        ...state,
        isHandicapLoading: action.payload,
      };
    case SET_MATCHUP_LOADING:
      return {
        ...state,
        isMatchupLoading: action.payload,
      };
    case SET_WAR_ROOM_MATCHUP:
      return {
        ...state,
        warRoomMatchup: action.payload,
      };
    case RESET_MATCHUP_STORE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export {matchupReducer};
