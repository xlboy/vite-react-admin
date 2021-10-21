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
        path: '*',
        meta: {
          titleId: '404 - 找不到页面'
        },
        element: lazy(() => import('@/pages/404'))
      }
    ]
  }
];

export default routes;
