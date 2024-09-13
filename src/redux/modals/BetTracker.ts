import {Bet} from './Bet';

interface PendingWagers {
  teaser: {
    wager_type__count: number;
    at_risk__sum: number;
    payout__sum: number;
  };
  parlay: {
    wager_type__count: number;
    at_risk__sum: number;
    payout__sum: number;
  };
  straight: {
    wager_type__count: number;
    at_risk__sum: number;
    payout__sum: number;
  };
  spread: {
    wager_type__count: number;
    at_risk__sum: number;
    payout__sum: number;
  };
  total: {
    wager_type__count: number;
    at_risk__sum: number;
    payout__sum: number;
  };
  moneyline: {
    wager_type__count: number;
    at_risk__sum: number;
    payout__sum: number;
  };
}

interface CompletedWagers {
  teaser: {
    profit_loss_sum: number;
    win__count: number;
    loss__count: number;
    push__count: number;
    wager_type__count: number;
    at_risk__sum: number;
  };
  parlay: {
    profit_loss_sum: number;
    win__count: number;
    loss__count: number;
    push__count: number;
    wager_type__count: number;
    at_risk__sum: number;
  };
  straight: {
    profit_loss_sum: number;
    win__count: number;
    loss__count: number;
    push__count: number;
    wager_type__count: number;
    at_risk__sum: number;
  };
  spread: {
    profit_loss_sum: number;
    win__count: number;
    loss__count: number;
    push__count: number;
    wager_type__count: number;
    at_risk__sum: number;
  };
  total: {
    profit_loss_sum: number;
    win__count: number;
    loss__count: number;
    push__count: number;
    wager_type__count: number;
    at_risk__sum: number;
  };
  moneyline: {
    profit_loss_sum: number;
    win__count: number;
    loss__count: number;
    push__count: number;
    wager_type__count: number;
    at_risk__sum: number;
  };
}

interface PerformanceState {
  pending_wagers: PendingWagers;
  completed_wagers: CompletedWagers;
}

interface WagerActivityResult {
  rated?: boolean;
  book?: string;
  book_name?: string;
  prize_status?: string;
  bet?: Array<Bet>;
  uuid: string;
  am_odds: number;
  dec_odds: number;
  sport: string;
  wager_status: string;
  wager_type: string;
  at_risk: number;
  payout: number;
  created_date: string;
  teaser_points: any;
}

interface BetTrackingResult {
  pagination?: {
    next: boolean;
    page: any;
  };
  count?: number;
  results?: Array<WagerActivityResult>;
}

interface BetTrackerModal {
  bet_tracking_result?: BetTrackingResult;
  performance_state?: PerformanceState;
}

interface BetTrackerFilters {
  wager_status?: Array<string>;
  sports_type?: Array<string>;
  bet_types?: Array<string>;
  wager_types?: Array<string>;
  book_ids?: Array<string>;
  date_range?: Array<string>;
  sort_by?: string;
}
interface ContestWagerFilters {
  wager_status?: Array<string>;
  wager_types?: Array<string>;
  date_range?: Array<string>;
  uuid: string;
}

export type {
  PerformanceState,
  PendingWagers,
  CompletedWagers,
  BetTrackerFilters,
  BetTrackingResult,
  BetTrackerModal,
  WagerActivityResult,
  ContestWagerFilters,
};
