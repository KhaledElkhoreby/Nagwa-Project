import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRankResponse } from '../interfaces/IRankResponse';

export const rankApi = createApi({
  reducerPath: 'rankApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL!}/rank`,
  }),
  tagTypes: ['Rank'],
  endpoints: (builder) => ({
    getRankofScore: builder.query<IRankResponse, number>({
      query: (score) => ({
        url: '/',
        body: { score },
        method: 'POST',
      }),
    }),
  }),
});

export const { useGetRankofScoreQuery } = rankApi;
