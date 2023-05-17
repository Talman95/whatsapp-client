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
