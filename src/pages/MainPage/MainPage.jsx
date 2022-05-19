import React from 'react';

import './MainPage.scss';

import { Sidebar } from './Sidebar/Sidebar';
import { Posts } from './Posts/Posts';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Favourite } from '../Favourite/Favourite';
import { USER_URL } from '../../helpers/constants';
import { Settings } from '../Settings/Settings';
import { BlogPostPage } from '../BlogPostPage/BlogPostPage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectUsers } from '../../store/slices/users';
import { selectPostsData } from '../../store/slices/posts';

export const MainPage = () => {
  const [isLikedPosts, setIsLikedPosts] = React.useState(false);
  const dispatch = useDispatch();
  const { list: posts, isLoading, error } = useSelector(selectPostsData);
  const users = useSelector(selectUsers);
  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [USER_URL]);

  const likedPosts = posts.filter((post) => post.liked);

  return (
    <>
      <Sidebar thumbnail={users.thumbnail} />
      <main className="mainBlock">
        <Switch>
          <Route exact path="/blog">
            <Posts title="Posts" posts={posts} isLoading={isLoading} error={error}/>
          </Route>

          <Route exact path="/favourite" component={Favourite}>
            <Posts title="Favourite posts" posts={likedPosts} isLoading={isLoading} error={error} isLikedPosts={isLikedPosts}/>
          </Route>

          <Route exact path="/settings">
            <Settings title="Настройки пользователя" users={users} />
          </Route>

          <Route path="/blog/:postId">
            <BlogPostPage />
          </Route>

          <Route exact path="/">
            <Redirect to="/blog" />
          </Route>
        </Switch>
      </main>
    </>
  );
};
