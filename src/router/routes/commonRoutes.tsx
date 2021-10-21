import { LockOutlined } from '@ant-design/icons';
import { lazy } from 'react';
import RouteWrapper from '../utils/RouteWrapper';
import type { BaseRouteItem } from '../types';
import type { PickRequired } from '@/types/utils';

interface CommonMenuRouteItem extends PickRequired<BaseRouteItem, 'key'> {}

interface CommonPageRouteItem extends BaseRouteItem {}

/**
 * @description 常见的页面，无需身份验证。如“登录页”等
 */
export const commonPageRoutes: CommonPageRouteItem[] = [
  {
    path: '/login',
    meta: {
      titleId: '登录'
    },
    element: <RouteWrapper element={lazy(() => import('@/pages/login'))} />
  }
];

/**
 * @description 常见的菜单，无需身份验证。如“个人中心页”或其他测试页面(404/权限测试)等
 * 此处会被LayoutMenu组件引入进行默认渲染
 */
export const commonMenuRoutes: CommonMenuRouteItem[] = [
  {
    path: 'permission',
    key: 'PERMISSION',
    meta: {
      titleId: '权限测试',
      iconElement: <LockOutlined />
    },
    children: [
      {
        index: true,
        key: 'PERMISSION_TEST_1',
        element: <RouteWrapper element={lazy(() => import('@/pages/permission/Test1'))} />,
        meta: {
          titleId: '测试1',
          keepAlive: true
        }
      },
      {
        path: 'test2',
        key: 'PERMISSION_TEST_2',
        meta: {
          keepAlive: true,
          titleId: '测试2'
        },
        children: [
          {
            index: true,
            key: 'PERMISSION_TEST_3',
            meta: {
              titleId: '测试3',
              isAuth: true,
              keepAlive: true
            },
            element: <RouteWrapper element={lazy(() => import('@/pages/permission/Test2'))} />
          },
          {
            path: 'test4',
            key: 'PERMISSION_TEST_4',
            meta: {
              titleId: '测试4',
              isAuth: true,
              keepAlive: true
            },
            element: <RouteWrapper element={lazy(() => import('@/pages/permission/Test2'))} />
          }
        ]
      }
    ]
  },
  {
    path: '404',
    key: '404',
    meta: {
      titleId: '404 - 找不到页面'
    },
    element: <RouteWrapper element={lazy(() => import('@/pages/404'))} />
  }
];
