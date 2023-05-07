import React, { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import s from './ConversationHeader.module.scss';

import avatar from 'common/assets/avatar.png';
import searchSolid from 'common/assets/search-solid.svg';

export const ConversationHeader: FC = () => {
  const navigate = useNavigate();

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
          <h4>Amelia Cuiree</h4>
          <p>online</p>
        </div>
      </div>

      <div className={s.chatHeaderRight}>
        <img src={searchSolid} alt="" />
      </div>
    </div>
  );
};
