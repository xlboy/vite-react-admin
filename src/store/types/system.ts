import type { LocaleTypes } from '@/locales/types';
import type { RouteItem } from '@/router';
import type { Theme as AtndTheme } from 'antd/lib/config-provider/context';

export interface SystemState {
  locale: LocaleTypes;
  theme: AtndTheme;
  activeTag: null | (Required<Pick<RouteItem, 'key' | 'path'>> & Pick<RouteItem['meta'], 'titleId'>);
  cacheTags: Array<Exclude<SystemState['activeTag'], null>>;
  isMobile: boolean;
  isMenuCollapsed: boolean;
}
