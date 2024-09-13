interface Engine {
  is_active?: true;
  name?: string;
  sport?: string;
  uuid?: string;
  notes?: string;
  subscribed_market_place?: Array<SubscribedMarketPlace>;
}

interface SubscribedMarketPlace {
  weight: number;
  is_active: boolean;
  uuid: string;
  betrics_name: string;
  betrics_type: string;
  dip_name: string;
}

interface UpdateEngine {
  is_active?: boolean;
  name?: string;
  sport?: string;
  uuid?: string;
  notes?: string;
}

interface CreateEngine {
  notes: string;
  sport: string;
}

interface UpdateEngineConfiguration {
  is_active: boolean;
  weight: number;
  subscribed_market_place_uuid: string;
}
export type {
  Engine,
  UpdateEngine,
  CreateEngine,
  SubscribedMarketPlace,
  UpdateEngineConfiguration,
};
