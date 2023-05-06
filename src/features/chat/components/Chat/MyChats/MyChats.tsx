import React, { FC } from 'react';

import s from './MyChats.module.scss';

import avatar from 'common/assets/avatar.png';
import chat from 'common/assets/chat.svg';
import circleNotchSolid from 'common/assets/circle-notch-solid.svg';
import more from 'common/assets/more.svg';
import { ChatItem } from 'features/chat/components/Chat/MyChats/ChatItem/ChatItem';

const chats = [] as {
  _id: number;
  fullName: string;
}[];

type PropsType = {
  handleOpen: () => void;
};

export const MyChats: FC<PropsType> = ({ handleOpen }) => {
  return (
    <div className={s.sidebar}>
      <div className={s.header}>
        <button type="button" onClick={handleOpen}>
          Open
        </button>
        <div className={s.avatar}>
          <img src={avatar} alt="" />
        </div>
        <div className={s.chatHeaderRight}>
          <img src={circleNotchSolid} alt="" />
          <img src={chat} alt="" />
          <img src={more} alt="" />
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
