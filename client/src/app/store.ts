import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rankApi } from '../services/rankApi';
import { wordsApi } from '../services/wordsApi';
import scoreReducer from '../features/score/scoreSlice';

export const store = configureStore({
  reducer: {
    [wordsApi.reducerPath]: wordsApi.reducer,
    [rankApi.reducerPath]: rankApi.reducer,
    score: scoreReducer,
  },
  // Adding the API middleware enables caching, invalidation, polling, and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(wordsApi.middleware)
      .concat(rankApi.middleware),
});

// Required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
