import { createSlice } from '@reduxjs/toolkit';

import { ChatType, MessageType } from 'features/chat/chatAPI';
import { accessChat, fetchAllChats } from 'features/chat/chatThunks';

const slice = createSlice({
  name: 'chat',
  initialState: {
    chats: [] as ChatType[],
    activeChat: null as null | ChatType,
    messages: [] as MessageType[],
  },
  reducers: {
    cleanActiveChat(state) {
      state.activeChat = null;
      state.messages = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllChats.fulfilled, (state, action) => {
        state.chats = action.payload.chats;
      })
      .addCase(accessChat.fulfilled, (state, action) => {
        state.activeChat = action.payload.activeChat;
        state.messages = action.payload.messages;
      });
  },
});

export const { reducer: chatReducer, actions: chatActions } = slice;
