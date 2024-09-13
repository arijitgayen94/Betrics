interface Bet {
  uuid?: string;
  bet_uuid?: string;
  book: string;
  am_odds: number;
  dec_odds: number;
  line: number;
  match_id: string;
  bet_side: 'Home' | 'Away' | 'Under' | 'Over';
  bet_type: 'Spread' | 'Moneyline' | 'Total';
  bet_point?: number | string;
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
  event_time: string;
  book_name?: string;
  rated?: boolean;
  bet_status?: string;
  sport: string;
}

interface PlaceBet {
  book: string;
  bet: Array<Bet>;
  wager_type: 'Straight' | 'Parlay' | 'Teaser';
  at_risk: number;
  teaser_points?: 6 | 6.5 | 7;
}

interface ClearBetQueue {
  bet_uuids: Array<string>;
}

export type {Bet, PlaceBet, ClearBetQueue};
