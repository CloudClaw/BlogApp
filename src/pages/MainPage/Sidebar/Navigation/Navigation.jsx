import React from 'react';
import './Navigation.scss';

import starIcon from '../../../../assets/img/star.svg';
import settingsIcon from '../../../../assets/img/settings.svg';
import blogIcon from '../../../../assets/img/blog.svg';
import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className="nav">
      <NavLink exact to="/blog" activeClassName="active">
        <img src={blogIcon} alt="" />
        <span>Blog</span>
      </NavLink>
      <NavLink exact to="/favourite" activeClassName="active">
        <img src={starIcon} alt="" />
        <span>Favourite</span>
      </NavLink>
      <NavLink exact to="/settings" activeClassName="active">
        <img src={settingsIcon} alt="" />
        <span>Settings</span>
      </NavLink>
    </nav>
  );
};
