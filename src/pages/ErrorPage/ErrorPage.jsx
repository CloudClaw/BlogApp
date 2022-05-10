import React from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './ErrorPage.scss';

export const ErrorPage = () => {
  const location = useLocation();

  return (
    <div>
      <h2>
        Страница <span className='locationSpan'>{location.pathname}</span> не существует
      </h2>
    </div>
  );
};
