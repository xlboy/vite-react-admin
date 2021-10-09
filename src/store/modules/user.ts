import { UserService } from '@/services';
import type { Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { UserState } from '../types/user';

const initialState: UserState = {
  menuList: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMenuList(state, action: PayloadAction<UserState['menuList']>) {
      state.menuList = action.payload;
    }
  }
});

export const userThunks = {
  initUserInfo: () => {
    return async (dispatch: Dispatch) => {
      const { data: menuList } = await UserService.getMenuList();

      dispatch(userActions.setMenuList(menuList));
    };
  }
};

export const userActions = userSlice.actions;

export default userSlice.reducer;
