import { createSlice } from '@reduxjs/toolkit';
import type { MenuItem } from '../types/user';

interface UserState {
  menuList: MenuItem[];
}

const initialState: UserState = {
  menuList: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
