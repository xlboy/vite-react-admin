import appConfig from '@/configs/app';
import React from 'react';
import { BrowserRouter, HashRouter, useRoutes } from 'react-router-dom';
import routes from './routes';

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
