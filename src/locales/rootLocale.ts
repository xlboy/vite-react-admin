import antdLocaleEnUS from 'antd/lib/calendar/locale/en_US';
import antdLocaleZhCN from 'antd/lib/calendar/locale/zh_CN';
import antdLocaleZhTW from 'antd/lib/calendar/locale/zh_TW';
import type { PickerLocale } from 'antd/lib/date-picker/generatePicker';
import complexContentLocale from './modules/complexContent';
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
  ...titleLocale
} as const;

export const rootAntdLocale: Record<LocaleTypes, PickerLocale> = {
  'en-US': antdLocaleEnUS,
  'zh-TW': antdLocaleZhTW,
  'zh-CN': antdLocaleZhCN
};
