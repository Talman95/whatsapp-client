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
  },
);

export const destroyConnection = createAsyncThunk('chat/destroyConnection', () => {
  chatAPI.destroyConnection();
});

export const joinChat = createAsyncThunk(
  'chat/joinChat',
  async (chatId: string | undefined, thunkAPI) => {
    if (!chatId) return;

    await chatAPI.joinChat(chatId);

    chatAPI.subscribeChat(
      message => {
        thunkAPI.dispatch(chatActions.newMessageSendHandler(message));
      },
      () => {
        thunkAPI.dispatch(chatActions.startTypingHandler());
      },
      () => {
        thunkAPI.dispatch(chatActions.stopTypingHandler());
      },
    );
  },
);

export const leaveChat = createAsyncThunk('chat/leaveChat', (chatId: string) => {
  chatAPI.leaveChat(chatId);
});

export const startTyping = createAsyncThunk('chat/startTyping', (chatId: string) => {
  chatAPI.startTyping(chatId);
});

export const stopTyping = createAsyncThunk('chat/stopTyping', (chatId: string) => {
  chatAPI.stopTyping(chatId);
});
