import React, { FC } from 'react';

import s from './Sidebar.module.scss';

import { useAppSelector } from 'app/hooks';
import closeIcon from 'common/assets/closeOutline.svg';
import { ChatItem } from 'features/chat/components/Chat/MyChats/ChatItem/ChatItem';
import { Search } from 'features/chat/components/Chat/Sidebar/Search/Search';

type PropsType = {
  isOpen: boolean;
  handleClose: () => void;
};

export const Sidebar: FC<PropsType> = ({ isOpen, handleClose }) => {
  const searchedUsers = useAppSelector(state => state.auth.searchedUsers);

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

        <Search />

        <div className={s.sidebarChats}>
          {searchedUsers.length === 0 ? (
            <div>No dialogs</div>
          ) : (
            searchedUsers.map(({ _id, fullName }) => (
              <ChatItem key={_id} _id={_id} chatName={fullName} />
            ))
          )}
        </div>
      </nav>
    </>
  );
};
