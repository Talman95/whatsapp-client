import { FC } from 'react';

import { Outlet } from 'react-router-dom';

import s from './App.module.scss';

export const App: FC = () => {
  return (
    <div className={s.app}>
      Hello from App!
      <Outlet />
    </div>
  );
};
