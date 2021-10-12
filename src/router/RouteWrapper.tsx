import { useAppIntl } from '@/locales';
import type { RouteProps } from 'react-router';
import AuthRoute from './RouteAuth';
import { matchCurrentPageRoute } from './utils';

interface RouteWrapperProps extends RouteProps {
  auth?: boolean;
}

const RouteWrapper: React.FC<RouteWrapperProps> = props => {
  const { auth, element } = props;
  const { f } = useAppIntl();

  const routeInfo = matchCurrentPageRoute();
  const { meta } = routeInfo?.route ?? {};

  const { titleId: routeTitleId } = meta ?? {};

  if (routeTitleId !== undefined) {
    document.title = f(routeTitleId!);
  }

  return <>{auth ? <AuthRoute>{element}</AuthRoute> : element}</>;
};

export default RouteWrapper;
