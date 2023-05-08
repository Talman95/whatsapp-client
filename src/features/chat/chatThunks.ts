import { createAsyncThunk } from '@reduxjs/toolkit';

import { chatAPI } from 'features/chat/chatAPI';

export const fetchAllChats = createAsyncThunk(
  'chat/fetchAllChats',
  async (_, { rejectWithValue }) => {
    try {
      const res = await chatAPI.fetchAllChat();

      return { chats: res };
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
