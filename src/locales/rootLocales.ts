import type { Locale } from 'antd/lib/locale-provider';
import antdLocaleEnUS from 'antd/lib/locale/en_US';
import antdLocaleZhCN from 'antd/lib/locale/zh_CN';
import antdLocaleZhTW from 'antd/lib/locale/zh_TW';
import complexContentLocale from './modules/complexContent';
import httpStatusLocale from './modules/httpStatus';
import menuLocale from './modules/menu';
import simpleContentLocale from './modules/simpleContent';
import systemLocale from './modules/system';
import titleLocale from './modules/title';
import type { LocaleTypes } from './types';

export const rootAppLocale = {
  ...complexContentLocale,
  ...menuLocale,
  ...simpleContentLocale,
  ...systemLocale,
  ...titleLocale,
  ...httpStatusLocale
} as const;

export const rootAntdLocale: Record<LocaleTypes, Locale> = {
  'en-US': antdLocaleEnUS,
  'zh-TW': antdLocaleZhTW,
  'zh-CN': antdLocaleZhCN
};
