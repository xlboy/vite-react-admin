import appConfig from '@/configs/app';
import type { RouteObject, RouteMatch } from 'react-router';
import { matchRoutes } from 'react-router';
import type { RouteItem } from '.';
import { routes } from '.';

interface CurrentRouteMath extends RouteMatch {
  route: RouteMatch['route'] & Pick<RouteItem, 'titleId'>;
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
export const matchCurrentRoutes = (): CurrentRouteMath[] | null => {
  return matchRoutes(routes as RouteObject[], getPathname());
};

/**
 * @description 匹配当前路由的信息
 * @see https://github.com/remix-run/react-router/blob/dev/docs/api-reference.md#matchroutes
 */
export const matchCurrentRoute = (): CurrentRouteMath | null => {
  const pathname = getPathname();
  const matchResult = matchRoutes(routes as RouteObject[], getPathname());

  if (!matchResult) {
    throw new Error(`匹配 (${pathname}) 路由信息异常`);
  }

  return matchResult.at(-1) as CurrentRouteMath;
};
