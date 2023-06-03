import { createBrowserRouter } from 'react-router-dom';

import { PrivateRoute } from 'app/PrivateRoute';
import { Login } from 'features/auth/components/Login/Login';
import { Register } from 'features/auth/components/Register/Register';
import { Chat } from 'features/chat/components/Chat/Chat';
import { Conversation } from 'features/chat/components/Chat/Conversation/Conversation';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <Chat />,
        children: [
          {
            path: 'chats/:userParamId',
            element: <Conversation />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);
