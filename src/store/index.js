import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { postsReducer } from './slices/posts';
import { userReducer } from './slices/users';

const reducer = {
  auth: authReducer,
  posts: postsReducer,
  users: userReducer,
};
export const store = configureStore({
  reducer,
});
