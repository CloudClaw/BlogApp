import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { APP_ROUTES } from '../../helpers/constants';
import { ErrorPage } from '../../pages/ErrorPage/ErrorPage';

export const PublicRoute = ({ isLoggedIn, path = false, exact, children, postsRoutes }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) => {
      //   const allRoutes = [...APP_ROUTES, ...postsRoutes];
      //   const isPathExists = allRoutes.some((route) => route === location.pathname);
      //   if (!isPathExists) return <ErrorPage />;

        if (!isLoggedIn) return children;
        return <Redirect to="/" />;
      }}
    />
  );
};
