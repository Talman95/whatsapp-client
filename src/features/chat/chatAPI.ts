import { api } from 'common/api/api';
import { UserType } from 'features/auth/authAPI';

export const chatAPI = {
  async fetchAllChat() {
    const res = await api.get<ChatType[]>('/chats');

    return res.data;
  },
};

export type ChatType = {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: UserType[];
  createdAt: string;
  updatedAt: string;
};
