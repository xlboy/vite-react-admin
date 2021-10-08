import type { rootAppLocale } from './rootLocale';
import type titleLocale from './modules/title';

export type LocaleTypes = 'zh_CN' | 'zh_TW' | 'en_US';

export type AppLocaleId = keyof typeof rootAppLocale;

export type AppTitleLocaleId = keyof typeof titleLocale;
