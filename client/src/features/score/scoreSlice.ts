import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IScoreState {
  numberOfAnsweredQuestions: number;
  numberOfCorrectAnswers: number;
  progress: number;
  score: number;
  currentScore: number;
}

const initialState: IScoreState = {
  numberOfAnsweredQuestions: 0,
  numberOfCorrectAnswers: 0,
  progress: 0,
  score: 0,
  currentScore: 0,
};

export const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    increment: (
      state: IScoreState,
      action: PayloadAction<{ isCorrect: boolean }>
    ) => {
      state.numberOfAnsweredQuestions += 1;
      state.progress = (state.numberOfAnsweredQuestions / 10) * 100;
      if (action.payload.isCorrect) {
        state.numberOfCorrectAnswers += 1;
        state.currentScore = (state.numberOfCorrectAnswers / 10) * 100;
      }
    },
    reset: (state: IScoreState) => {
      state.score = state.currentScore;
      state.currentScore = 0;
      state.numberOfCorrectAnswers = 0;
      state.numberOfAnsweredQuestions = 0;
      state.progress = 0;
    },
  },
});

export const { increment, reset } = scoreSlice.actions;

export default scoreSlice.reducer;
