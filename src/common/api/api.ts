import axios from 'axios';

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : 'https://whatsapp-server-nine.vercel.app/',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth-token-chat');

  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = token;

  return config;
});
