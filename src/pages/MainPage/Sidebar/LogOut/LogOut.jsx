import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { ReactComponent as ArrowLeftIcon } from '../../../../assets/img/left-arrow.svg';
import { logOut } from '../../../../store/slices/auth';
import './LogOut.scss';

export const LogOut = ({}) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
    history.push('/home');
  };

  return (
    <section className="sidabarBottom">
      <button onClick={handleLogOut}>
        <ArrowLeftIcon />
        <img src="" alt="" />
        <span>Выход</span>
      </button>
    </section>
  );
};
