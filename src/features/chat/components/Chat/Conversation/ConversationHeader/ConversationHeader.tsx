import React, { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import s from './ConversationHeader.module.scss';

import { useAppSelector } from 'app/hooks';
import avatar from 'common/assets/avatar.png';
import searchSolid from 'common/assets/search-solid.svg';

type PropsType = {
  chatName: string;
};

export const ConversationHeader: FC<PropsType> = ({ chatName }) => {
  const navigate = useNavigate();

  const isTyping = useAppSelector(state => state.chat.isTyping);

  const onBackClick = (): void => {
    navigate('/');
  };

  return (
    <div className={s.header}>
      <button type="button" onClick={onBackClick}>
        Back
      </button>

      <div className={s.chatTitle}>
        <div className={s.avatar}>
          <img src={avatar} alt="" />
        </div>
        <div className={s.messageHeaderContent}>
          <h4>{chatName}</h4>
          {isTyping ? (
            <p className={s.indicator}>typing...</p>
          ) : (
            <p className={s.indicator}>online</p>
          )}
        </div>
      </div>

      <div className={s.chatHeaderRight}>
        <img src={searchSolid} alt="" />
      </div>
    </div>
  );
};
