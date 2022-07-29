import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IWordsResponse } from '../interfaces/IWordsResponse';
console.log(`${process.env.REACT_APP_BASE_URL!}/words`);

// Define a service using a base URL and expected endpoints
export const wordsApi = createApi({
  reducerPath: 'wordsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL!}/words`,
  }),
  tagTypes: ['Words'],
  endpoints: (builder) => ({
    getWords: builder.query<IWordsResponse, void>({
      query: () => '/',
      // Pick out data and prevent nested properties in a hook or selector
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const { useGetWordsQuery } = wordsApi;
