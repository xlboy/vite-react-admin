import appConfig from '@/configs/app';
import type { LocaleTypes } from '@/locales/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface SystemState {
  locale: LocaleTypes;
  cacheTagIds: string[];
  activeTagId: null | string;
  isMobile: boolean;
  isMenuCollapsed: boolean;
}

const initialState: SystemState = {
  locale: (localStorage.getItem(appConfig.cacheKey.locale) ?? 'zh-CN') as LocaleTypes,
  cacheTagIds: [],
  activeTagId: null,
  isMobile: false,
  isMenuCollapsed: false
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setIsMenuCollapsed(state, action: PayloadAction<undefined | boolean>) {
      const isMenuCollapsed = action.payload;

      state.isMenuCollapsed = isMenuCollapsed ?? !state.isMenuCollapsed;
    },
    setIsMobile(state, action: PayloadAction<boolean>) {
      state.isMobile = action.payload;
    },
    setLocale(state, action: PayloadAction<LocaleTypes>) {
      const locale = action.payload;

      state.locale = locale;
    },
    removeAllTag(state) {
      state.cacheTagIds = [];
    },
    removeExceptSpecifiedTagIds(state, action: PayloadAction<string>) {
      const specifiedTagId = action.payload;

      state.cacheTagIds = [specifiedTagId];
      state.activeTagId = specifiedTagId;
    },
    removeSpecifiedTagId(state, action: PayloadAction<string>) {
      const specifiedTagId = action.payload;
      const tagIdIndex = state.cacheTagIds.indexOf(specifiedTagId);
      const isFirstOne = tagIdIndex === 0;
      const isLast = tagIdIndex === state.cacheTagIds.length - 1;

      state.cacheTagIds.splice(tagIdIndex, 1);

      if (state.cacheTagIds.length !== 0) {
        // 刚好要删除的是第一个，则将tag切换到最新一位
        if (isFirstOne) {
          state.activeTagId = state.cacheTagIds[0];
        } else if (isLast) {
          // 以此类推，删的是最后一个，切换至最后一位
          state.activeTagId = state.cacheTagIds.at(-1)!;
        }
      }
    },
    setActiveTagId(state, action: PayloadAction<string>) {
      const activeTagId = action.payload;

      state.activeTagId = activeTagId;
    }
  }
});

export const systemActions = systemSlice.actions;

export default systemSlice.reducer;
