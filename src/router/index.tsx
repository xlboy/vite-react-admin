import appConfig from '@/configs/app';
import type { AppTitleLocaleId } from '@/locales/types';
import NotFound from '@/pages/404';
import DashboardPage from '@/pages/dashboard';
import LayoutPage from '@/pages/layout';
import LoginPage from '@/pages/login';
import PermissionTest1 from '@/pages/permission/Test1';
import PermissionTest2 from '@/pages/permission/Test2';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import type { PartialRouteObject } from 'react-router';
import { BrowserRouter, HashRouter, useRoutes } from 'react-router-dom';
import RouteWrapper from './RouteWrapper';

export interface RouteItem extends PartialRouteObject {
  iconElement?: JSX.Element;
  access?: string;
  titleId?: AppTitleLocaleId;
  children?: RouteItem[];
}

/**
 * @see https://github.com/remix-run/react-router/blob/useroutes-example/examples/
 */
export const routes: RouteItem[] = [
  {
    path: '/login',
    titleId: '登录',
    element: <RouteWrapper element={<LoginPage />} />,
    children: []
  },
  {
    path: '/',
    element: <RouteWrapper element={<LayoutPage />} />,
    children: [
      {
        path: 'dashboard',
        iconElement: <MailOutlined />,
        titleId: '首页',
        access: 'DASHBOARD',
        element: <RouteWrapper element={<DashboardPage />} />
      },
      {
        path: 'permission',
        iconElement: <LockOutlined />,
        titleId: '权限测试',
        access: 'PERMISSION',
        children: [
          {
            path: '/',
            iconElement: <MailOutlined />,
            titleId: '测试1',
            access: 'PERMISSION_TEST_1',
            element: <RouteWrapper element={<PermissionTest1 />} />
          },
          {
            path: '/test2',
            iconElement: <MailOutlined />,
            titleId: '测试2',
            access: 'PERMISSION_TEST_2',
            element: <RouteWrapper element={<PermissionTest2 />} />
          }
        ]
      },
      {
        path: '*',
        titleId: '404 - 找不到页面',
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
