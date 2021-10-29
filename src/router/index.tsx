import AppErrorBoundary from '@/components/App/ErrorBoundary';
import appConfig from '@/configs/app';
import { createBrowserHistory, createHashHistory } from 'history';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import RouteChangeWrapper from './utils/RouteChangeWrapper';
import RouterWrapper from './utils/RouterWrapper';

const RenderRouter: React.FC = () => {
  const element = useRoutes(routes);

  return element;
};

/**
 * @see https://github.com/ReactTraining/history/tree/master/docs/api-reference.md#createhashhistory
 */
export const appHistory = appConfig.routerMode === 'hash' ? createHashHistory() : createBrowserHistory();

export const notLoginRoutePaths = ['/login'];

export default (): JSX.Element => {
  return (
    <RouterWrapper history={appHistory}>
      <AppErrorBoundary>
        <RouteChangeWrapper>
          <RenderRouter />
        </RouteChangeWrapper>
      </AppErrorBoundary>
    </RouterWrapper>
  );
};
