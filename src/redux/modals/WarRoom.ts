interface WrMatchup {
  _id: string;
  scheduled: string;
  placed_bets_count?: number;
  away: {
    id: string;
    name: string;
    country: string;
    abbreviation: string;
    uuid: string;
    icon: string;
    record: string;
  };
  home: {
    id: string;
    name: string;
    country: string;
    abbreviation: string;
    uuid: string;
    icon: string;
    record: string;
  };
  status: string;
  match_id: string;
  broadcast: string;
  book_id: string;
  moneyline: {
    current: {
      home: number;
      away: number;
      home_dec: number;
      away_dec: number;
      home_imp: string;
      away_imp: string;
    };
    open: {
      home: number;
      away: number;
      home_dec: number;
      away_dec: number;
      home_imp: string;
      away_imp: string;
    };
  };
  spread: {
    current: {
      home: number;
      away: number;
      home_dec: number;
      away_dec: number;
      home_imp: string;
      away_imp: string;
      home_spread: number;
      away_spread: number;
    };
    open: {
      home: number;
      away: number;
      home_dec: number;
      away_dec: number;
      home_imp: string;
      away_imp: string;
      home_spread: number;
      away_spread: number;
    };
  };
  total: {
    current: {
      over: number;
      under: number;
      over_dec: number;
      under_dec: number;
      over_imp: string;
      under_imp: string;
      total: number | string;
    };
    open: {
      over: number;
      under: number;
      over_dec: number;
      under_dec: number;
      over_imp: string;
      under_imp: string;
      total: number;
    };
  };
  selected_bets: {
    home_spread: {
      status: boolean;
      uuid: string;
    };
    away_spread: {
      status: boolean;
      uuid: string;
    };
    home_moneyline: {
      status: boolean;
      uuid: string;
    };
    away_moneyline: {
      status: boolean;
      uuid: string;
    };
    over: {
      status: boolean;
      uuid: string;
    };
    under: {
      status: boolean;
      uuid: string;
    };
  };
}

interface GetWrMatchupRequest {
  week_id: string;
  book_id: string;
}

interface GetSnapshotProjectionRequest {
  match_id: string;
  book_id: string;
  away_id: string;
  home_id: string;
  week?: string;
}

interface GetSnapshotStatsRequest {
  team_id: string;
}

interface GetLineupsStatsRequest {
  team_id: string;
}

interface GetProjectionRequest {
  team_id: string;
}
interface GetLineupsInjuriesRequest {
  team_id: string;
}

interface GetHandicapRequest {
  match_id: string;
  book: string;
  sport_type: string;
}

interface GetHandicapRequest {
  match_id: string;
  book: string;
  sport_type: string;
}

interface PutPowerRankingRequest {
  nfl_team_sr_id: string;
}

interface PatchHandicapRequest {
  home_score: number;
  away_score: number;
}

interface RankingRequest {
  away_id: string;
  home_id: string;
}
interface PlayerRankingRequest {
  team_id: string;
}
interface LiveMoveRequest {
  match_id: string;
  book_id: string;
  days: number;
}
interface GameLogRequest {
  team_id: string;
}

export type {
  GetWrMatchupRequest,
  WrMatchup,
  GetSnapshotStatsRequest,
  GetLineupsStatsRequest,
  GetProjectionRequest,
  GetLineupsInjuriesRequest,
  GetHandicapRequest,
  PutPowerRankingRequest,
  PatchHandicapRequest,
  GetSnapshotProjectionRequest,
  RankingRequest,
  PlayerRankingRequest,
  LiveMoveRequest,
  GameLogRequest,
};
