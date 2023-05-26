import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from 'app/store';
import { chatAPI } from 'features/chat/chatAPI';
import { chatActions } from 'features/chat/chatSlice';

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

export const accessChat = createAsyncThunk(
  'chat/accessChat',
  async (userId: string, { rejectWithValue }) => {
    try {
      const chat = await chatAPI.accessChat(userId);
      const messages = await chatAPI.fetchAllMessages(chat._id);

      return { activeChat: chat, messages };
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (data: { content: string; chatId: string }, { rejectWithValue }) => {
    try {
      const message = await chatAPI.sendMessage(data.chatId, data.content);

      return { message };
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const createConnection = createAsyncThunk(
  'chat/createConnection',
  (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { user } = state.auth;

    if (user) {
      chatAPI.createConnection(user);
    }

    chatAPI.subscribe(message => {
      thunkAPI.dispatch(chatActions.newMessageSendHandler(message));
    });
  },
);

export const joinChat = createAsyncThunk(
  'chat/joinChat',
  (chatId: string | undefined) => {
    if (!chatId) return;
    chatAPI.joinChat(chatId);
  },
);

export const destroyConnection = createAsyncThunk('chat/destroyConnection', () => {
  chatAPI.destroyConnection();
});
