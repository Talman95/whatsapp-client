import { createBrowserRouter, Outlet } from 'react-router-dom';

import { PrivateRoute } from 'app/PrivateRoute';
import { Login } from 'features/auth/components/Login/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: (
          <div>
            Nav with list of dialogs
            <Outlet />
          </div>
        ),
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
    element: <div>Register</div>,
  },
]);
