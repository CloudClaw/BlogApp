import React from 'react';
import { LogOut } from './LogOut/LogOut';

import { Navigation } from './Navigation/Navigation';
import './Sidebar.scss';
import { User } from './User/User';

export const Sidebar = ({ thumbnail }) => {
  return (
    <aside className="sidebar">
      <section className="sidebatTop">
        <User thumbnail={thumbnail} />
        <Navigation />
      </section>
      <section className="sidebarBottom">
        <LogOut />
      </section>
    </aside>
  );
};
