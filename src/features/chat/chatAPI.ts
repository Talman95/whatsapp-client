import { io } from 'socket.io-client';

import { api } from 'common/api/api';
import { UserType } from 'features/auth/authAPI';

export const chatAPI = {
  socket: null as null | any,

  async fetchAllChat() {
    const res = await api.get<ChatType[]>('/chats');

    return res.data;
  },

  async accessChat(userId: string) {
    const res = await api.post<ChatType>('/chats', { userId });

    return res.data;
  },

  async fetchAllMessages(chatId: string) {
    const res = await api.get<MessageType[]>(`/messages/${chatId}`);

    return res.data;
  },

  async sendMessage(chatId: string, content: string) {
    const res = await api.post<MessageType>(`/messages`, { chatId, content });

    this.socket.emit('new message', chatId, res.data);
    this.socket.emit('stop typing', chatId);

    return res.data;
  },

  createConnection(user: UserType) {
    this.socket = io('http://localhost:5000');
    this.socket.emit('setup', user);
  },

  joinChat(chatId: string) {
    this.socket.emit('join chat', chatId);
  },

  // subscribeChat(
  //   newMessageSendHandler: (message: MessageType) => void,
  //   typingHandler: (isTyping: boolean) => void,
  // ) {
  //   this.socket.on('message received', newMessageSendHandler);
  //   this.socket.on('typing', typingHandler);
  //   this.socket.on('stop typing', typingHandler);
  // },

  subscribeChat(
    newMessageSendHandler: (message: MessageType) => void,
    startTypingHandler: () => void,
    stopTypingHandler: () => void,
  ) {
    this.socket.on('message received', newMessageSendHandler);
    this.socket.on('typing', startTypingHandler);
    this.socket.on('stop typing', stopTypingHandler);
  },

  leaveChat(chatId: string) {
    this.socket.emit('leave chat', chatId);
    this.socket.off('message received');
    this.socket.off('typing');
    this.socket.off('stop typing');
  },

  destroyConnection() {
    this.socket.disconnect();
    this.socket = null;
  },

  startTyping(chatId: string) {
    this.socket.emit('typing', chatId);
  },

  stopTyping(chatId: string) {
    this.socket.emit('stop typing', chatId);
  },
};

export type SendMessageType = {
  sender: SenderType;
  content: string;
  chat: ChatType;
  readBy: any[];
  _id: string;
  createdAt: string;
  updatedAt: string;
};
export type SenderType = {
  _id: string;
  fullName: string;
};

export type ChatType = {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: UserType[];
  createdAt: string;
  updatedAt: string;
  latestMessage: string;
};

export type MessageType = {
  _id: string;
  sender: MessageSenderType;
  content: string;
  chat: ChatType;
  createdAt: string;
  updatedAt: string;
};

export type MessageSenderType = {
  _id: string;
  fullName: string;
  email: string;
};
