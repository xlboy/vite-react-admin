import appConfig from '@/configs/app';
import type { RouteObject, RouteMatch } from 'react-router';
import { matchRoutes } from 'react-router';
import type { RouteItem } from '.';
import { routes } from '.';

interface CurrentRouteMath extends RouteMatch {
  route: RouteMatch['route'] & RouteItem;
}

const getPathname = () => {
  const isHash = appConfig.routerMode === 'hash';
  const pathname = isHash ? location.hash.replace(/^#/, '') : location.pathname;

  return pathname;
};

/**
 * @description 匹配当前路由的层级信息
 * @see https://github.com/remix-run/react-router/blob/dev/docs/api-reference.md#matchroutes
 */
export const matchCurrentPageRoutes = (): CurrentRouteMath[] | null => {
  return matchRoutes(routes as RouteObject[], getPathname());
};

/**
 * @description 匹配当前路由的信息
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
 * @description 根据指定的key匹配出route
 */
export const matchKeyRoute = (() => {
  let flatRoutes: RouteItem[] | null = null;

  const handleFlatRoutes = (_routes: RouteItem[], _flatRoutes: RouteItem[] = []) => {
    _routes.forEach(route => {
      _flatRoutes.push(route);
      if (route.children !== undefined && route.children.length !== 0) {
        handleFlatRoutes(route.children, _flatRoutes);
      }
    });

    return _flatRoutes;
  };

  const insideMatch = <K extends keyof RouteItem>(key: K, value: RouteItem[K]) => {
    flatRoutes ??= handleFlatRoutes(routes);

    return flatRoutes?.find(item => item[key] === value);
  };

  return insideMatch;
})();

/**
 * @description 根据指定的key匹配出树结构中相关的路径信息
 */
export const matchRouteKeyPaths = (() => {
  let matchResult: RouteItem[] = [];

  const insideMatch = (key: string, _routes = routes): boolean => {
    return _routes.some((item, index) => {
      if (item.key === key) {
        matchResult.push(item);

        return true;
      } else if (item.children?.length) {
        matchResult.push(item);

        return insideMatch(key, item.children);
      } else if (index === _routes.length - 1) {
        matchResult.pop();
      }

      return false;
    });
  };

  return (key: string): RouteItem[] => {
    matchResult = [];
    insideMatch(key, routes);

    return matchResult;
  };
})();
