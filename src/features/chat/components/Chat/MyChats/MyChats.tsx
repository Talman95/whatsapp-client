import React, { FC, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import s from './MyChats.module.scss';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import avatar from 'common/assets/avatar.png';
import { getSenderUser } from 'common/utils/getSenderUser';
import { fetchAllChats } from 'features/chat/chatThunks';
import { ChatItem } from 'features/chat/components/Chat/MyChats/ChatItem/ChatItem';

type PropsType = {
  handleOpen: () => void;
};

export const MyChats: FC<PropsType> = ({ handleOpen }) => {
  const dispatch = useAppDispatch();

  const chats = useAppSelector(state => state.chat.chats);
  const authUserId = useAppSelector(state => state.auth.user?._id);

  const { chatId } = useParams();

  useEffect(() => {
    dispatch(fetchAllChats());
  }, []);

  return (
    <div
      className={`${s.container} ${chatId ? s.containerWithId : s.containerWithoutId}`}
    >
      <div className={s.header}>
        <button type="button" onClick={handleOpen}>
          Open
        </button>
        <div className={s.avatar}>
          <img src={avatar} alt="" />
        </div>
      </div>

      <div className={s.sidebarChats}>
        {chats.length === 0 ? (
          <div>No dialogs</div>
        ) : (
          chats.map(({ _id, chatName, isGroupChat, users }) => (
            <ChatItem
              key={_id}
              _id={isGroupChat ? _id : getSenderUser(authUserId, users)._id}
              chatName={
                isGroupChat ? chatName : getSenderUser(authUserId, users).fullName
              }
            />
          ))
        )}
      </div>
    </div>
  );
};
