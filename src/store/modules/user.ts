import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  menuList: any[];
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
