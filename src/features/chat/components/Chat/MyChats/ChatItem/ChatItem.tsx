import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';

import s from './ChatItem.module.scss';

import avatar from 'common/assets/avatar.png';

type PropsType = {
  _id: string;
  chatName: string;
  avatarUrl?: string;
};

export const ChatItem: FC<PropsType> = ({ _id, chatName, avatarUrl }) => {
  return (
    <NavLink
      to={`/chats/${_id}`}
      className={({ isActive }) => (isActive ? `${s.active}` : ``)}
    >
      <div className={s.sidebarChat}>
        <div className={s.chatAvatar}>
          <img src={avatarUrl || avatar} alt="User" />
        </div>
        <div className={s.chatInfo}>
          <h4>{chatName}</h4>
          <p>Hey meet me tomorrow</p>
        </div>
        <div className={s.time}>
          <p>2:44 pm</p>
        </div>
      </div>
    </NavLink>
  );
};
