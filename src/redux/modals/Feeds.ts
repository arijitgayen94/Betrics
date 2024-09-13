interface Feed {
  pagination: {
    next: boolean;
    page?: number;
  };
  count: number;
  results: [
    {
      images?: any;
      user_profile: string;
      name: string;
      user_uuid: string;
      total_likes: number;
      is_liked_by_user: boolean;
      liked_emoji: string;
      created_at: string;
      updated_at: string;
      public_meta?: any;
      post: string;
      uuid: string;
      disable_like: boolean;
      disable_comment: boolean;
      disable_share: boolean;
      status: string;
    },
  ];
}

export type {Feed};
