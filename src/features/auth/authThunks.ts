import { createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI, LoginDataType, RegisterDataType } from 'features/auth/authAPI';

export const register = createAsyncThunk(
  'auth/register',
  async (registerData: RegisterDataType, { rejectWithValue }) => {
    try {
      const res = await authAPI.register(registerData);

      const { token, ...userData } = res.data;

      localStorage.setItem('auth-token-chat', token);

      return { user: userData };
    } catch (e: any) {
      return rejectWithValue('error');
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (loginData: LoginDataType, { rejectWithValue }) => {
    try {
      const res = await authAPI.login(loginData);

      const { token, ...userData } = res.data;

      localStorage.setItem('auth-token-chat', token);

      return { user: userData };
    } catch (e: any) {
      return rejectWithValue('error');
    }
  },
);

export const authMe = createAsyncThunk('auth/authMe', async (_, { rejectWithValue }) => {
  try {
    const res = await authAPI.authMe();

    return { user: res.data };
  } catch (e: any) {
    return rejectWithValue('error');
  }
});
