import React, { ChangeEvent, FC, useState } from 'react';

import { useAppDispatch } from 'app/hooks';
import searchSolid from 'common/assets/search-solid.svg';
import { getUsersByName } from 'features/auth/authThunks';
import s from 'features/chat/components/Chat/Sidebar/Sidebar.module.scss';

export const Search: FC = () => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState('');

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.currentTarget.value);
  };

  const onSearchClick = (): void => {
    dispatch(getUsersByName(search));
  };

  return (
    <div className={s.sidebarSearch}>
      <div className={s.sidebarSearchContainer}>
        <input
          type="text"
          placeholder="Search or start new chat"
          onChange={onSearchChange}
          value={search}
        />
        <button type="button" onClick={onSearchClick}>
          <img src={searchSolid} alt="" />
          search
        </button>
      </div>
    </div>
  );
};
