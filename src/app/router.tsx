import { createBrowserRouter } from 'react-router-dom';

import { PrivateRoute } from 'app/PrivateRoute';
import { Login } from 'features/auth/components/Login/Login';
import { Register } from 'features/auth/components/Register/Register';
import { Chat } from 'features/chat/components/Chat/Chat';

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
            path: 'chats/:chatId',
            element: <div>Chat</div>,
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
