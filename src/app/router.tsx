import { createBrowserRouter, Outlet } from 'react-router-dom';

import { PrivateRoute } from 'app/PrivateRoute';

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
    element: <div>Login</div>,
  },
  {
    path: '/register',
    element: <div>Register</div>,
  },
]);
