import React from 'react';

import './SearchForm.scss';
import searchIcon from '../../../../../assets/img/search.svg';

export const SearchForm = () => {
  return (
    <form className="searchForm">
      <input type="text" placeholder="Найти" />
      <img src={searchIcon} alt="search" />
    </form>
  );
};
