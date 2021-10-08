import { useLocale } from '@/locales';
import type { RouteProps } from 'react-router';
import { Route as NormalRoute } from 'react-router-dom';
import AuthRoute from './RouteAuth';
import { matchCurrentRoute } from './utils';

interface RouteWrapperProps extends RouteProps {
  auth?: boolean;
}

const RouteWrapper: React.FC<RouteWrapperProps> = props => {
  const { auth, ...routeProps } = props;
  const { f } = useLocale();
  const WithRoute = auth ? AuthRoute : NormalRoute;

  const routeInfo = matchCurrentRoute();
  const routeTitleId = routeInfo?.route.titleId;

  if (routeTitleId) {
    document.title = f(routeTitleId);
  }

  return <WithRoute {...routeProps} />;
};

export default RouteWrapper;
