import React, { FC } from 'react';

import { useParams } from 'react-router-dom';

import s from './MyChats.module.scss';

import avatar from 'common/assets/avatar.png';
import { ChatItem } from 'features/chat/components/Chat/MyChats/ChatItem/ChatItem';

const chats = [
  { _id: 1, fullName: '1111' },
  { _id: 2, fullName: '1111' },
  { _id: 3, fullName: '1111' },
  { _id: 4, fullName: '1111' },
  { _id: 5, fullName: '1111' },
  { _id: 6, fullName: '1111' },
  { _id: 7, fullName: '1111' },
  { _id: 8, fullName: '1111' },
] as {
  _id: number;
  fullName: string;
}[];

type PropsType = {
  handleOpen: () => void;
};

export const MyChats: FC<PropsType> = ({ handleOpen }) => {
  const { chatId } = useParams();

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
          chats.map(({ _id, fullName }) => (
            <ChatItem key={_id} id={_id} fullName={fullName} />
          ))
        )}
      </div>
    </div>
  );
};
