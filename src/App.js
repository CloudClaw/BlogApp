import { Switch } from 'react-router-dom';
import React from 'react';

import '../src/App.scss';
import { HomePage } from './pages/HomePage/HomePage';
import { MainPage } from './pages/MainPage/MainPage';
import { PrivatRoute } from './components/PrivatRoute/PrivatRoute';
import { PublicRoute } from './components/PublicRoute/PublicRoute';
import { POST_URL } from './helpers/constants';
import { useFetchPosts } from './helpers/getPosts';

function App() {
  const [isLoggedIn, setIsLoggeIn] = React.useState(localStorage.getItem('isLoggedIn') === 'true');
  const postsData = useFetchPosts(POST_URL);

  const postsRoutes = postsData.posts.map((post) => {
    return `/blog/${post.id}`;
  });


  return (
    <div className="App">
      <Switch>
        <PublicRoute exact path="/home" isLoggedIn={isLoggedIn} postsRoutes={postsRoutes}>
          <HomePage setIsLoggeIn={setIsLoggeIn} />
        </PublicRoute>

        <PrivatRoute path="/" isLoggedIn={isLoggedIn}>
          <MainPage setIsLoggeIn={setIsLoggeIn} postsData={postsData} postsRoutes={postsRoutes} />
        </PrivatRoute>
      </Switch>
    </div>
  );
}

export default App;
