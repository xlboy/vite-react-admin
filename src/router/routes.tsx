import type { AppTitleLocaleId } from '@/locales/types';
import { BarChartOutlined, LockOutlined, RocketOutlined } from '@ant-design/icons';
import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import RouteWrapper from './RouteWrapper';

export interface RouteItem extends RouteObject {
  key?: string;
  children?: RouteItem[];
  meta: {
    iconElement?: JSX.Element;
    keepAlive?: boolean;
    titleId?: AppTitleLocaleId;
    isHome?: boolean;
    isCommon?: boolean;
  };
}

const routes: RouteItem[] = [
  {
    path: '/login',
    meta: {
      titleId: '登录'
    },
    element: <RouteWrapper element={lazy(() => import('@/pages/login'))} />,
    children: []
  },
  {
    path: '/',
    element: <RouteWrapper element={lazy(() => import('@/layout'))} />,
    meta: {},
    children: [
      {
        path: '/dashboard',
        meta: {
          titleId: '首页',
          isHome: true,
          keepAlive: true,
          iconElement: <BarChartOutlined />
        },
        key: 'DASHBOARD',
        element: <RouteWrapper element={lazy(() => import('@/pages/dashboard'))} />
      },
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
                  keepAlive: true
                },
                element: <RouteWrapper element={lazy(() => import('@/pages/permission/Test2'))} />
              },
              {
                path: 'test4',
                key: 'PERMISSION_TEST_4',
                meta: {
                  titleId: '测试4',
                  keepAlive: true
                },
                element: <RouteWrapper element={lazy(() => import('@/pages/permission/Test2'))} />
              }
            ]
          }
        ]
      },
      {
        path: 'error-handle',
        meta: {
          iconElement: <RocketOutlined />,
          titleId: '异常处理'
        },
        key: 'ERROR_HANDLE',
        element: <RouteWrapper element={lazy(() => import('@/pages/ErrorHandle'))} />
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
