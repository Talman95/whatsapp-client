import React, { FC, useEffect } from 'react';

import { RouterProvider } from 'react-router-dom';

import { initialize } from 'app/appSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { router } from 'app/router';

export const App: FC = () => {
  const dispatch = useAppDispatch();

  const isAppInitialized = useAppSelector(state => state.app.isAppInitialized);

  useEffect(() => {
    dispatch(initialize());
  }, [dispatch]);

  if (!isAppInitialized) {
    return <div>Loading...</div>;
  }

  return <RouterProvider router={router} />;
};
