import { configureStore } from '@reduxjs/toolkit';

import { appReducer } from 'app/appSlice';
import { authReducer } from 'features/auth/authSlice';
import { chatReducer } from 'features/chat/chatSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    chat: chatReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
