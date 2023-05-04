import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authMe } from 'features/auth/authThunks';

const slice = createSlice({
  name: 'app',
  initialState: {
    error: null as string | null,
    isLoading: false,
    isAppInitialized: false,
  },
  reducers: {
    setError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setIsLoading(state, action: PayloadAction<{ isLoading: boolean }>) {
      state.isLoading = action.payload.isLoading;
    },
    setIsAppInitialized(state, action: PayloadAction<{ isAppInitialized: boolean }>) {
      state.isAppInitialized = action.payload.isAppInitialized;
    },
  },
});

export const { actions: appActions, reducer: appReducer } = slice;

export const initialize = createAsyncThunk('app/initialize', async (_, { dispatch }) => {
  await dispatch(authMe());

  dispatch(appActions.setIsAppInitialized({ isAppInitialized: true }));
});
