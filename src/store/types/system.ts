import type { LocaleTypes } from '@/locales/types';
import type { BaseRouteItem } from '@/router/types';
import type { Theme as AtndTheme } from 'antd/lib/config-provider/context';

export interface SystemState {
  locale: LocaleTypes;
  mode: 'dark' | 'light';
  theme: AtndTheme;
  activeTag: null | (Required<Pick<BaseRouteItem, 'key' | 'path'>> & Pick<BaseRouteItem['meta'], 'titleId' | 'isHome'>);
  cacheTags: Array<Exclude<SystemState['activeTag'], null>>;
  isMobile: boolean;
  isMenuCollapsed: boolean;
}
