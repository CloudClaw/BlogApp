import { Switch } from 'react-router-dom';
import React from 'react';

import '../src/App.scss';
import { HomePage } from './pages/HomePage/HomePage';
import { MainPage } from './pages/MainPage/MainPage';
import { PrivatRoute } from './components/PrivatRoute/PrivatRoute';
import { PublicRoute } from './components/PublicRoute/PublicRoute';

function App() {
  //   const postsRoutes = posts.map((post) => {
  //     return `/blog/${posts.id}`;
  //   });

  return (
    <div className="App">
      <Switch>
        <PublicRoute exact path="/home">
          <HomePage />
        </PublicRoute>

        <PrivatRoute path="/">
          <MainPage />
        </PrivatRoute>
      </Switch>
    </div>
  );
}

export default App;
