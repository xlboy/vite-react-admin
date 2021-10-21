import appConfig from '@/configs/app';
import type { RouteMatch, RouteObject } from 'react-router';
import { matchRoutes } from 'react-router';
import routes from '../routes';
import type { BaseRouteItem } from '../types';

interface CurrentRouteMath extends RouteMatch {
  route: RouteMatch['route'] & BaseRouteItem;
}

const getPathname = () => {
  const isHash = appConfig.routerMode === 'hash';
  const pathname = isHash ? location.hash.replace(/^#/, '') : location.pathname;

  return pathname;
};

/**
 * @description 匹配当前页面的route路径信息
 * @see https://github.com/remix-run/react-router/blob/dev/docs/api-reference.md#matchroutes
 */
export const matchCurrentPageRoutes = (): CurrentRouteMath[] | null => {
  return matchRoutes(routes as RouteObject[], getPathname()) as CurrentRouteMath[];
};

/**
 * @description 匹配当前页面的route
 * @see https://github.com/remix-run/react-router/blob/dev/docs/api-reference.md#matchroutes
 */
export const matchCurrentPageRoute = (): CurrentRouteMath | null => {
  const pathname = getPathname();
  const matchResult = matchRoutes(routes as RouteObject[], getPathname());

  if (!matchResult) {
    throw new Error(`匹配 (${pathname}) 路由信息异常`);
  }

  return matchResult.at(-1) as CurrentRouteMath;
};

/**
 * @description 根据指定的字段在router树中匹配出对应的route
 */
export const matchFieldRoute = (() => {
  let flatRoutes: BaseRouteItem[] | null = null;

  const handleFlatRoutes = (_routes: BaseRouteItem[], _flatRoutes: BaseRouteItem[] = []) => {
    _routes.forEach(route => {
      _flatRoutes.push(route);
      if (route.children !== undefined && route.children.length !== 0) {
        handleFlatRoutes(route.children, _flatRoutes);
      }
    });

    return _flatRoutes;
  };

  const insideMatch = <K extends keyof BaseRouteItem>(key: K, value: BaseRouteItem[K]): BaseRouteItem | undefined => {
    flatRoutes ??= handleFlatRoutes(routes);

    if (value === undefined) {
      throw new Error('传进的key为undefined');
    }

    return flatRoutes?.find(item => item[key] === value);
  };

  return insideMatch;
})();

/**
 * @description 根据指定的key值在router树中匹配出相关的route路径信息
 */
export const matchRouteKeyPaths = (() => {
  let matchResult: BaseRouteItem[] = [];

  const insideMatch = (key: string, _routes = routes): boolean => {
    return _routes.some((item, index) => {
      if (item.key === key) {
        matchResult.push(item);

        return true;
      } else if (item.children?.length) {
        matchResult.push(item);

        const childMatchResult = insideMatch(key, item.children);

        if (!childMatchResult) {
          matchResult.pop();

          return false;
        }

        return true;
      } else if (index === _routes.length - 1) {
        matchResult.pop();
      }

      return false;
    });
  };

  return (key: string): BaseRouteItem[] => {
    matchResult = [];
    insideMatch(key, routes);

    return matchResult;
  };
})();
