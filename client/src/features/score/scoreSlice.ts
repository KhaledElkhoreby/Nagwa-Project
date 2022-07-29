import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface IScoreState {
  status: string;
  value: number;
}

const initialState: IScoreState = {
  status: 'undeterminded',
  value: 0,
};

export const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    increment: (state: IScoreState) => {
      state.value += 1;
    },
    decrement: (state: IScoreState) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = scoreSlice.actions;

export const selectScore = (state: RootState) => state.score.value;

export default scoreSlice.reducer;
