import appConfig from '@/configs/app';
import type { AppTitleLocaleId } from '@/locales/types';
import NotFound from '@/pages/404';
import DashboardPage from '@/pages/dashboard';
import LayoutPage from '@/pages/layout';
import LoginPage from '@/pages/login';
import PermissionTest1 from '@/pages/permission/Test1';
import PermissionTest2 from '@/pages/permission/Test2';
import { BarChartOutlined, LockOutlined } from '@ant-design/icons';
import type { RouteObject } from 'react-router';
import { BrowserRouter, HashRouter, useRoutes } from 'react-router-dom';
import RouteWrapper from './RouteWrapper';

export interface RouteItem extends RouteObject {
  key?: string;
  children?: RouteItem[];
  meta: {
    iconElement?: JSX.Element;
    keepAlive?: boolean;
    titleId?: AppTitleLocaleId;
  };
}

/**
 * @see https://github.com/remix-run/react-router/blob/useroutes-example/examples/
 */
export const routes: RouteItem[] = [
  {
    path: '/login',
    meta: {
      titleId: '登录'
    },
    element: <RouteWrapper element={<LoginPage />} />,
    children: []
  },
  {
    path: '/',
    element: <RouteWrapper element={<LayoutPage />} />,
    meta: {},
    children: [
      {
        path: 'dashboard',
        meta: {
          titleId: '首页',
          keepAlive: true,
          iconElement: <BarChartOutlined />
        },
        key: 'DASHBOARD',
        element: <RouteWrapper element={<DashboardPage />} />
      },
      {
        path: 'permission/',
        key: 'PERMISSION',
        meta: {
          titleId: '权限测试',
          iconElement: <LockOutlined />
        },
        children: [
          {
            index: true,
            key: 'PERMISSION_TEST_1',
            element: <RouteWrapper element={<PermissionTest1 />} />,
            meta: {
              titleId: '测试1',
              keepAlive: true
            }
          },
          {
            path: 'test2/',
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
                element: <RouteWrapper element={<PermissionTest2 />} />
              },
              {
                path: 'test4',
                key: 'PERMISSION_TEST_4',
                meta: {
                  titleId: '测试4',
                  keepAlive: true
                },
                element: <RouteWrapper element={<PermissionTest2 />} />
              }
            ]
          }
        ]
      },
      {
        path: '*',
        meta: {
          titleId: '404 - 找不到页面'
        },
        element: <RouteWrapper element={<NotFound />} />
      }
    ]
  }
];

const RenderRouter: React.FC = () => {
  const element = useRoutes(routes);

  return element;
};

export default (): JSX.Element => {
  const isHash = appConfig.routerMode === 'hash';
  const WithRouter = isHash ? HashRouter : BrowserRouter;

  return (
    <WithRouter>
      <RenderRouter />
    </WithRouter>
  );
};
