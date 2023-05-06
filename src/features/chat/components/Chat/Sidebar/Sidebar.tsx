import React, { FC } from 'react';

import s from './Sidebar.module.scss';

import closeIcon from 'common/assets/closeOutline.svg';
import searchSolid from 'common/assets/search-solid.svg';
import { ChatItem } from 'features/chat/components/Chat/MyChats/ChatItem/ChatItem';

type PropsType = {
  isOpen: boolean;
  handleClose: () => void;
};

const results = [{ _id: 1, fullName: '123' }];

export const Sidebar: FC<PropsType> = ({ isOpen, handleClose }) => {
  const sidebarClass = s.sidebar + (isOpen ? ` ${s.open}` : '');

  return (
    <>
      {/* затемнение справа от открытого меню */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      {isOpen && <div className={s.background} onClick={handleClose} />}

      <nav className={sidebarClass}>
        <button type="button" className={s.close} onClick={handleClose}>
          <img src={closeIcon} alt="close sidebar" id="hw5-menu-close" />
        </button>

        <div className={s.sidebarSearch}>
          <div className={s.sidebarSearchContainer}>
            <img src={searchSolid} alt="" />
            <input type="text" placeholder="Search or start new chat" />
          </div>
        </div>

        <div className={s.sidebarChats}>
          {results.length === 0 ? (
            <div>No dialogs</div>
          ) : (
            results.map(({ _id, fullName }) => (
              <ChatItem key={_id} id={_id} fullName={fullName} />
            ))
          )}
        </div>
      </nav>
    </>
  );
};
