import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRankResponse } from '../interfaces/IRankResponse';

export const rankApi = createApi({
  reducerPath: 'rankApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL!}/rank`,
  }),
  tagTypes: ['Rank'],
  endpoints: (builder) => ({
    getRankofScore: builder.mutation<IRankResponse, number>({
      query: (score: number) => ({ url: '/', method: 'GET', body: { score } }),
      transformResponse: (response: { data: IRankResponse }, meta, arg) =>
        response.data,
    }),
  }),
});

export const { useGetRankofScoreMutation } = rankApi;
