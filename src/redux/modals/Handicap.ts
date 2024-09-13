interface HandicapModal {
  book: string;
  match_id: string;
  home_score: number;
  away_score: number;
  sport_type: string;
  uuid: string;
}

interface GetHandicapModal {
  match_id: string;
  book: string;
  sport_type: string;
}

export type {HandicapModal, GetHandicapModal};
