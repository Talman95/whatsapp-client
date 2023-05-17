import { api } from 'common/api/api';
import { UserType } from 'features/auth/authAPI';

export const chatAPI = {
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

    return res.data;
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
