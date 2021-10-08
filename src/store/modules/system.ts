import appConfig from '@/configs/app';
import type { LocaleTypes } from '@/locales/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface SystemState {
  locale: LocaleTypes;
  cacheTags: any[];
  activeTag: any;
  isMobile: boolean;
  isMenuCollapsed: boolean;
}

const initialState: SystemState = {
  locale: (localStorage.getItem(appConfig.cacheKey.locale) ?? 'zh-CN') as LocaleTypes,
  cacheTags: [],
  activeTag: null,
  isMobile: false,
  isMenuCollapsed: false
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setIsMenuCollapsed(state, action: PayloadAction<undefined | boolean>) {
      state.isMenuCollapsed = action.payload ?? !state.isMenuCollapsed;
    },
    setIsMobile(state, action: PayloadAction<boolean>) {
      state.isMobile = action.payload;
    },
    setLocale(state, action: PayloadAction<LocaleTypes>) {
      state.locale = action.payload;
    }
  }
});

export const systemActions = systemSlice.actions;

export default systemSlice.reducer;
