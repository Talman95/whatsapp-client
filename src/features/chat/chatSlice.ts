import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ChatType, MessageType } from 'features/chat/chatAPI';
import {
  accessChat,
  fetchAllChats,
  fetchMessages,
  sendMessage,
} from 'features/chat/chatThunks';

const slice = createSlice({
  name: 'chat',
  initialState: {
    chats: [] as ChatType[],
    activeChat: null as null | ChatType,
    messages: [] as MessageType[],
    isTyping: false,
    currentPage: 1,
    hasNextPage: true,
  },
  reducers: {
    cleanActiveChat(state) {
      state.activeChat = null;
      state.messages = [];
      state.currentPage = 1;
    },
    setNextPage(state) {
      state.currentPage += 1;
    },
    newMessageSendHandler(state, action: PayloadAction<MessageType>) {
      state.messages.push(action.payload);
    },
    startTypingHandler(state) {
      state.isTyping = true;
    },
    stopTypingHandler(state) {
      state.isTyping = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllChats.fulfilled, (state, action) => {
        state.chats = action.payload.chats;
      })
      .addCase(accessChat.fulfilled, (state, action) => {
        state.activeChat = action.payload.activeChat;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = [...action.payload.messages.reverse(), ...state.messages];
        state.hasNextPage = Boolean(action.payload.messages.length > 0);
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload.message);
      });
  },
});

export const { reducer: chatReducer, actions: chatActions } = slice;
