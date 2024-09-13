import {RESET_FILTERS, SET_FILTERS} from '../actionTypes';

const INITIAL_STATE = {
  initialFilters: {
    wager_status: [
      {name: 'Pending', isChecked: false},
      {name: 'Win', isChecked: false},
      {name: 'Loss', isChecked: false},
      {name: 'Push', isChecked: false},
    ],
    sports_type: [
      {name: 'Nfl', isChecked: false},
      {name: 'Nba', isChecked: false},
    ],
    wager_types: [
      {name: 'Parlay', isChecked: false},
      {name: 'Teaser', isChecked: false},
    ],
    bet_types: [
      {name: 'Spread', isChecked: false},
      {name: 'Moneyline', isChecked: false},
      {name: 'Total', isChecked: false},
    ],
    books: [],
    date_range: [],
    sort_by: 'Latest',
  },
};

const betTrackerReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_FILTERS:
      return {
        ...state,
        initialFilters: action.payload,
      };
    case RESET_FILTERS:
      return {
        ...state,
        initialFilters: {
          wager_status: [
            {name: 'Pending', isChecked: false},
            {name: 'Win', isChecked: false},
            {name: 'Loss', isChecked: false},
            {name: 'Push', isChecked: false},
          ],
          sports_type: [
            {name: 'Nfl', isChecked: false},
            {name: 'Nba', isChecked: false},
          ],
          wager_types: [
            {name: 'Parlay', isChecked: false},
            {name: 'Teaser', isChecked: false},
          ],
          bet_types: [
            {name: 'Spread', isChecked: false},
            {name: 'Moneyline', isChecked: false},
            {name: 'Total', isChecked: false},
          ],
          books: [],
          date_range: [],
          sort_by: 'Win',
        },
      };
    default:
      return state;
  }
};

export {betTrackerReducer};
