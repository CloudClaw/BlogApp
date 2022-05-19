import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { APP_ROUTES } from '../../helpers/constants';
import { ErrorPage } from '../../pages/ErrorPage/ErrorPage';
import { selectIsLoggedIn } from '../../store/slices/auth';
import { selectPostsData } from '../../store/slices/posts';

export const PublicRoute = ({ path = false, exact, children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { posts } = useSelector(selectPostsData);

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
