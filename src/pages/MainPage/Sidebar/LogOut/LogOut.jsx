import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { ReactComponent as ArrowLeftIcon } from '../../../../assets/img/left-arrow.svg';
import './LogOut.scss';

export const LogOut = ({ setIsLoggeIn }) => {

	const history = useHistory()

  const logOut = () => {
    setIsLoggeIn(false);
	 history.push('/home')
  };

  return (
    <section className="sidabarBottom">
      <button onClick={logOut}>
        <ArrowLeftIcon />
        <img src="" alt="" />
        <span>Выход</span>
      </button>
    </section>
  );
};
