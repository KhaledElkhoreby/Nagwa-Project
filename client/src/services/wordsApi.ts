import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IWordsResponse } from '../interfaces/IWordsResponse';

// Define a service using a base URL and expected endpoints
export const wordsApi = createApi({
  reducerPath: 'wordsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL!}/words`,
  }),
  endpoints: (builder) => ({
    getWords: builder.query<IWordsResponse, void>({
      query: () => '/',
    }),
  }),
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetWordsQuery } = wordsApi;
