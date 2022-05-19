import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { USER_URL } from '../../helpers/constants';

const initialState = {
  userList: [],
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get(USER_URL);
    return response.data;
  } catch (error) {
    console.log('Ошибка при получении пользователей', error);
  }
});

export const editUsers = createAsyncThunk('users/editUsers', async (newUserData) => {
  try {
    const response = await axios.put(USER_URL + '/' + newUserData.id, newUserData);
    return response.data;
  } catch (error) {
    console.log('Ошибка при редактировании пользователя', error);
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.userList = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(editUsers.fulfilled, (state, action) => {
      state.userList = state.userList.map((user) => {
        if (user.id === action.payload.id) return action.payload;
        return user;
      });
    });
    builder.addCase(editUsers.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const selectUsers = (state) => state.users.userList;

export const userReducer = userSlice.reducer;
