import { api } from 'common/api/api';

export const authAPI = {
  register(registerData: RegisterDataType) {
    return api.post<UserServerType>('/auth/register', registerData);
  },
  login(loginData: LoginDataType) {
    return api.post<UserServerType>('auth/login', loginData);
  },
  authMe() {
    return api.get<UserType>('/auth/me');
  },
  fetchUsersByName(name: string) {
    return api.get<UserType[]>('/auth/users', {
      params: {
        name,
      },
    });
  },
};

export type RegisterDataType = {
  email: string;
  password: string;
  fullName: string;
};

export type LoginDataType = {
  email: string;
  password: string;
};

export type UserServerType = {
  _id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  token: string;
};

export type UserType = Omit<UserServerType, 'token'>;
