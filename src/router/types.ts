import type { AppTitleLocaleId } from '@/locales/types';
import type { RouteObject } from 'react-router';

export interface BaseRouteItem extends RouteObject {
  key?: string;
  children?: BaseRouteItem[];
  meta: {
    iconElement?: JSX.Element;
    keepAlive?: boolean;
    titleId?: AppTitleLocaleId;
    isHome?: boolean;
    isAuth?: boolean;
  };
}
