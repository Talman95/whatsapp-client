import { createSlice } from '@reduxjs/toolkit';

import { ChatType } from 'features/chat/chatAPI';
import { fetchAllChats } from 'features/chat/chatThunks';

const slice = createSlice({
  name: 'chat',
  initialState: {
    chats: [] as ChatType[],
    activeChat: null as null | ChatType,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAllChats.fulfilled, (state, action) => {
      state.chats = action.payload.chats;
    });
  },
});

export const { reducer: chatReducer, actions: chatActions } = slice;
