import type { LocaleTypes } from '@/locales/types';
import type { RouteItem } from '@/router';

export interface SystemState {
  locale: LocaleTypes;
  activeTag: null | Required<Pick<RouteItem, 'key' | 'titleId' | 'path'>>;
  cacheTags: Array<Exclude<SystemState['activeTag'], null>>;
  isMobile: boolean;
  isMenuCollapsed: boolean;
}
