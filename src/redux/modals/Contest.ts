interface GetContestRequest {
  contest_uuid: string;
}

interface GetContestListRequest {
  page: string;
}

interface createTribeRequest {
  name: string;
  is_public: boolean;
}

interface joinTribeRequest {
  pass_code: string;
}

interface getTribeLeadersRequest {
  page: string;
  public?: boolean;
  name?: string;
}

interface getWagerRequest {
  is_tribe: boolean;
  uuid: string;
}

export type {
  GetContestRequest,
  GetContestListRequest,
  createTribeRequest,
  joinTribeRequest,
  getTribeLeadersRequest,
  getWagerRequest,
};
