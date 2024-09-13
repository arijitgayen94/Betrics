interface EngineResultModal {
  away_score: string;
  home_score: string;
  away_spread: string;
  home_spread: string;
  away_prob: string;
  home_prob: string;
  total: string;
  prediction: {
    away_spread: string;
    home_spread: string;
    away_moneyline: string;
    home_moneyline: string;
    over_total: string;
    under_total: string;
  };
  probability: {
    away_spread: string;
    home_spread: string;
    away_moneyline: string;
    home_moneyline: string;
    over_total: string;
    under_total: string;
  };
  edge: {
    away_spread: string;
    home_spread: string;
    away_moneyline: string;
    home_moneyline: string;
    over_total: string;
    under_total: string;
  };
  EV: {
    away_spread: string;
    home_spread: string;
    away_moneyline: string;
    home_moneyline: string;
    over_total: string;
    under_total: string;
  };
  kelly: {
    away_spread: string;
    home_spread: string;
    away_moneyline: string;
    home_moneyline: string;
    over_total: string;
    under_total: string;
  };
}
interface Matchup {
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
      away_best_line: string;
      home_best_line: string;
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
      away_best_line: string;
      home_best_line: string;
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
      over_best_line: string;
      under_best_line: string;
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
  engine_result: EngineResultModal;
}

interface EngineMatchup {
  pagination: object;
  count: number;
  results: Array<Matchup>;
}

interface GetMatchupRequest {
  week_id: string;
  book_id: string;
}

interface LineViewFilterOptionModal {
  id: string;
  display: string;
  isSelected: boolean;
  key?: string;
}

export type {
  GetMatchupRequest,
  Matchup,
  LineViewFilterOptionModal,
  EngineResultModal,
  EngineMatchup,
};
