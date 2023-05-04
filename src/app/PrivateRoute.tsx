import { FC } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';

export const PrivateRoute: FC = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
