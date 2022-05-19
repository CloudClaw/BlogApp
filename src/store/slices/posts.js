import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { POST_URL } from '../../helpers/constants';

const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get(POST_URL);
    return response.data;
  } catch (error) {
    console.log('Ошибка при получении постов', error);
  }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
  try {
    const response = await axios.delete(POST_URL + '/' + postId);
    return await response.data;
  } catch (error) {
    console.log('Ошибка при удалении поста', error);
  }
});

export const likePost = createAsyncThunk('posts/likePost', async (updatedPost) => {
  try {
    const response = await axios.put(POST_URL + '/' + updatedPost.id, updatedPost);
    return await response.data;
  } catch (error) {
    console.log('Ошибка при лайке поста', error);
  }
});

export const editPost = createAsyncThunk('posts/editPost', async (updatedPost) => {
  try {
    const response = await axios.put(POST_URL + '/' + updatedPost.id, updatedPost);
    return await response.data;
  } catch (error) {
    console.log('Ошибка при изменении поста', error);
  }
});

export const createNewPost = createAsyncThunk('posts/createNewPost', async (newPost) => {
  try {
    const response = await axios.post(POST_URL, newPost);
    return await response.data;
  } catch (error) {
    console.log('Ошибка при создании поста', error);
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.list = state.list.filter((post) => {
        return post.id !== action.payload.id;
      });
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(likePost.fulfilled, (state, action) => {
      state.list = state.list.map((post) => {
        if (post.id === action.payload.id) return action.payload;
        return post;
      });
    });
    builder.addCase(likePost.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      state.list = [...state.list].map((post) => {
        if (post.id === action.payload.id) return action.payload;
        return post;
      });
    });
    builder.addCase(editPost.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(createNewPost.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });
    builder.addCase(createNewPost.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const postsReducer = postsSlice.reducer;

export const { setPosts } = postsSlice.actions;

export const selectPostsData = (state) => state.posts;
