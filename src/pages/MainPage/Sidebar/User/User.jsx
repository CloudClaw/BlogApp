import React from 'react';

import avatar from '../../../../assets/img/avatar.jpg';
import './User.scss';

export const User = ({ thumbnail = avatar }) => {
  return (
    <section className="user">
      <div className="avatar">
        <img src={thumbnail} alt="avatar" />
      </div>
      <h3>Artem</h3>
    </section>
  );
};
