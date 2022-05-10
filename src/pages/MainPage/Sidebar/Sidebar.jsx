import React from 'react';
import { LogOut } from './LogOut/LogOut';

import { Navigation } from './Navigation/Navigation';
import './Sidebar.scss';
import { User } from './User/User';

export const Sidebar = ({ thumbnail, setIsLoggeIn }) => {
  const handleLogOut = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggeIn(false);
  };

  return (
    <aside className="sidebar">
      <section className="sidebatTop">
        <User thumbnail={thumbnail} />
        <Navigation />
      </section>
      <section className="sidebarBottom">
        <LogOut setIsLoggeIn={handleLogOut} />
      </section>
    </aside>
  );
};
