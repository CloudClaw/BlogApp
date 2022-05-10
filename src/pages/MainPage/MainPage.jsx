import React from 'react';

import './MainPage.scss';

import { Sidebar } from './Sidebar/Sidebar';
import { Posts } from './Posts/Posts';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Favourite } from '../Favourite/Favourite';
import { USER_URL } from '../../helpers/constants';
import { Settings } from '../Settings/Settings';
import axios from 'axios';
import { BlogPostPage } from '../BlogPostPage/BlogPostPage';

export const MainPage = ({ setIsLoggeIn, postsData }) => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const getUsers = async () => {
      await axios.get(USER_URL).then((usersFromServer) => {
        setUsers(usersFromServer.data);
      });
    };
    getUsers();
  }, []);

  return (
    <>
      <Sidebar thumbnail={users.thumbnail} setIsLoggeIn={setIsLoggeIn} />
      <main className="mainBlock">
        <Switch>
          <Route exact path="/blog">
            <Posts title="Posts" {...postsData} />
          </Route>

          <Route exact path="/favourite" component={Favourite}>
            <Posts title="Favourite posts" {...postsData} isLikedPosts />
          </Route>

          <Route exact path="/settings">
            <Settings title="Настройки пользователя" users={users} setUsers={setUsers} />
          </Route>

          <Route path="/blog/:postId">
            <BlogPostPage setPosts={postsData.setPosts} />
          </Route>

          <Route exact path="/">
            <Redirect to="/blog" />
          </Route>
        </Switch>
      </main>
    </>
  );
};
