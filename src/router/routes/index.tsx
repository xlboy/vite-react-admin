import { lazy } from 'react';
import RouteWrapper from '../utils/RouteWrapper';
import type { BaseRouteItem } from '../types';
import authRoutes from './autoRoutes';
import { commonMenuRoutes, commonPageRoutes } from './commonRoutes';

const routes: BaseRouteItem[] = [
  ...commonPageRoutes,
  {
    path: '/',
    element: <RouteWrapper element={lazy(() => import('@/layout'))} />,
    meta: {},
    children: [
      ...authRoutes,
      ...commonMenuRoutes,
      {
        path: '403',
        meta: {
          titleId: '403 - 无权访问'
        },
        element: <RouteWrapper element={lazy(() => import('@/pages/403'))} />
      },
      {
        path: '*',
        meta: {
          titleId: '404 - 找不到页面'
        },
        element: <RouteWrapper element={lazy(() => import('@/pages/404'))} />
      }
    ]
  }
];

export default routes;
