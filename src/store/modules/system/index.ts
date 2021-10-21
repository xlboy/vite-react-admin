import type { LocaleTypes } from '@/locales/types';
import { matchFieldRoute } from '@/router/utils';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import type { SystemState } from '../../types/system';
import { initAppLocale, initAppTheme } from './utils';

const initialState: SystemState = {
  locale: initAppLocale(),
  theme: initAppTheme(),
  cacheTags: [],
  activeTag: null,
  isMobile: false,
  isMenuCollapsed: false
};

type NormalTag = Exclude<SystemState['activeTag'], null>;

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
      state.cacheTags = [];
    },
    removeSpecifiedTag(state, action: PayloadAction<NormalTag>) {
      const specifiedTag = action.payload;
      const specifiedTagIndex = state.cacheTags.findIndex(item => item.key === specifiedTag.key);
      const currentActiveTagIndex = state.cacheTags.findIndex(item => item.key === state.activeTag?.key);
      const isFirstOne = specifiedTagIndex === 0;
      const isLastOne = specifiedTagIndex === state.cacheTags.length - 1;

      state.cacheTags.splice(specifiedTagIndex, 1);

      // 判断删除的tag是否为活跃的tag，如若是，则将 活跃tag 换位
      if (state.cacheTags.length !== 0 && currentActiveTagIndex === specifiedTagIndex) {
        // 刚好要删除的是第一个，则将tag切换到最新一位
        if (isFirstOne) {
          state.activeTag = state.cacheTags[0];
        } else if (isLastOne) {
          // 以此类推，删的是最后一个，切换至最后一位
          state.activeTag = state.cacheTags.at(-1)!;
        } else {
          // 删的是中间区域的，切换至下一位
          state.activeTag = state.cacheTags[currentActiveTagIndex];
        }
      }
    },
    removeExceptSpecifiedTag(state, action: PayloadAction<NormalTag>) {
      const specifiedTag = action.payload;

      state.cacheTags = [specifiedTag];
      state.activeTag = specifiedTag;
    },
    switchOrAddActiveTag(state, action: PayloadAction<string>) {
      const tagKey = action.payload;
      const cacheTag = state.cacheTags.find(item => item.key === tagKey);

      if (!cacheTag) {
        const matchRoute = matchFieldRoute('key', tagKey);

        if (matchRoute) {
          const newTag = {
            ..._.pick(matchRoute, ['key', 'path']),
            ..._.pick(matchRoute.meta, ['titleId', 'isHome'])
          } as NormalTag;

          state.activeTag = newTag;
          state.cacheTags.push(newTag);
        } else {
          throw new Error('切换的tag-key值异常');
        }
      } else {
        state.activeTag = cacheTag;
      }
    },
    setTheme(state, action: PayloadAction<SystemState['theme']>) {
      const theme = action.payload;

      Object.assign(state.theme, theme);
    }
  }
});

export const systemActions = systemSlice.actions;

export default systemSlice.reducer;
