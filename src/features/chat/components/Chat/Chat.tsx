import { FC, useCallback, useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';

import s from './Chat.module.scss';
import { MyChats } from './MyChats/MyChats';

import { useAppDispatch } from 'app/hooks';
import { createConnection, destroyConnection } from 'features/chat/chatThunks';
import { Sidebar } from 'features/chat/components/Chat/Sidebar/Sidebar';

export const Chat: FC = () => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleOpen = useCallback(() => setIsOpen(true), []);

  useEffect(() => {
    dispatch(createConnection());

    return () => {
      dispatch(destroyConnection());
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <Sidebar isOpen={isOpen} handleClose={handleClose} />
      <div className={s.container}>
        <MyChats handleOpen={handleOpen} />
        <Outlet />
      </div>
    </>
  );
};
