import type { rootAppLocale } from './rootLocale';
import type titleLocale from './modules/title';

/**
 * @see 更多国家地区代码请阅：https://blog.csdn.net/shenenhua/article/details/79150053
 */
export type LocaleTypes = 'zh-CN' | 'zh-TW' | 'en-US';

export type AppLocaleId = keyof typeof rootAppLocale;

export type AppTitleLocaleId = keyof typeof titleLocale;
