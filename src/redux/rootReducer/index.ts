import {combineReducers} from 'redux';
import {
  authReducer,
  betReducer,
  booksReducer,
  engineReducer,
  marketplaceReducer,
  matchupReducer,
  loadingReducer,
  betTrackerReducer,
  snapshotStatsReducer,
  WrMatchupReducer,
  contestReducer,
  warRoomReducer,
  subscriptionReducer,
  notificationReducer,
  feedReducer,
} from '../reducers';

const rootReducer = combineReducers({
  authReducer: authReducer,
  booksReducer: booksReducer,
  matchupReducer: matchupReducer,
  betReducer: betReducer,
  marketplaceReducer: marketplaceReducer,
  engineReducer: engineReducer,
  loadingReducer: loadingReducer,
  betTrackerReducer: betTrackerReducer,
  WrMatchupReducer: WrMatchupReducer,
  snapshotStatsReducer: snapshotStatsReducer,
  contestReducer: contestReducer,
  warRoomReducer: warRoomReducer,
  subscriptionReducer: subscriptionReducer,
  notificationReducer: notificationReducer,
  feedReducer: feedReducer,
});

export default rootReducer;
