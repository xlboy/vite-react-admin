import { useAppIntl } from '@/locales';
import { KeepAlive } from 'react-activation';
import type { RouteProps } from 'react-router';
import { Route as NormalRoute } from 'react-router-dom';
import AuthRoute from './RouteAuth';
import { matchCurrentPageRoute, matchRouteKeyPaths } from './utils';

interface RouteWrapperProps extends RouteProps {
  auth?: boolean;
}

const RouteWrapper: React.FC<RouteWrapperProps> = props => {
  const { auth, element } = props;
  const { f } = useAppIntl();

  const WithRoute = auth ? AuthRoute : NormalRoute;

  const routeInfo = matchCurrentPageRoute();
  const { meta, key } = routeInfo!.route;

  const { titleId: routeTitleId, keepAlive: isKeepAlive } = meta ?? {};

  if (routeTitleId !== undefined) {
    document.title = f(routeTitleId!);
  }

  return isKeepAlive === true ? <KeepAlive key={key}>{element}</KeepAlive> : <>{element}</>; //;<WithRoute {...routeProps} />;
};

export default RouteWrapper;
