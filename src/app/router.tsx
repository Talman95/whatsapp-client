import { createBrowserRouter } from 'react-router-dom';

import { App } from 'app/App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'chats/:chatId',
        element: <div>Chats</div>,
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
