import { createSlice } from '@reduxjs/toolkit';

import { UserType } from 'features/auth/authAPI';
import { authMe, login, register } from 'features/auth/authThunks';

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null as UserType | null,
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(authMe.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
      });
  },
});

export const { actions: authActions, reducer: authReducer } = slice;
