import appConfig from '@/configs/app';
import type { LocaleTypes } from '@/locales/types';
import type { SystemState } from '@/store/types/system';
import { message } from 'antd';

export const initAppTheme = (): SystemState['theme'] => {
  const cacheTheme = localStorage.getItem(appConfig.cacheKey.theme);

  if (cacheTheme !== null) {
    try {
      return JSON.parse(cacheTheme) as SystemState['theme'];
    } catch (error) {
      message.error('Theme Error');
    }
  }

  return {
    primaryColor: '#13c2c2'
  };
};

export const initAppLocale = (): LocaleTypes => {
  const cacheLocale = localStorage.getItem(appConfig.cacheKey.locale);

  return (cacheLocale ?? 'zh-CN') as LocaleTypes;
};
