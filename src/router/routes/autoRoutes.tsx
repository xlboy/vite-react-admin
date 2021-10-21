import { BarChartOutlined } from '@ant-design/icons';
import { lazy } from 'react';
import RouteWrapper from '../utils/RouteWrapper';
import type { BaseRouteItem } from '../types';

interface AuthRouteItem extends BaseRouteItem {}

/**
 * @description 过滤routes，统一加上isAuth = true
 */
const wrapAuthRoutes = (routes: AuthRouteItem[]) =>
  routes.map(item => {
    item.meta.isAuth = true;
    if (item.children?.length) {
      wrapAuthRoutes(item.children);
    }

    return item;
  });

const authRoutes: AuthRouteItem[] = wrapAuthRoutes([
  {
    path: 'dashboard',
    meta: {
      titleId: '首页',
      isHome: true,
      keepAlive: true,
      iconElement: <BarChartOutlined />
    },
    key: 'DASHBOARD',
    element: <RouteWrapper element={lazy(() => import('@/pages/dashboard'))} />
  }
]);

export default authRoutes;
