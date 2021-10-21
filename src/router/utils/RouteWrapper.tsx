import { useAppIntl } from '@/locales';
import type { ComponentType } from 'react';
import type { RouteProps } from 'react-router';
import AuthRoute from '../utils/RouteAuth';
import { matchCurrentPageRoute } from '.';

type RouteWrapperProps = Omit<RouteProps, 'element'> & {
  auth?: boolean;
  element: React.LazyExoticComponent<ComponentType<{}>>;
};

const RouteWrapper: React.FC<RouteWrapperProps> = props => {
  const { auth, element: ElementComponent } = props;
  const { f } = useAppIntl();

  const routeInfo = matchCurrentPageRoute();
  const { meta } = routeInfo?.route ?? {};

  const { titleId: routeTitleId } = meta ?? {};

  if (routeTitleId !== undefined) {
    document.title = f(routeTitleId!);
  }

  return (
    <>
      {auth ? (
        <AuthRoute>
          <ElementComponent />
        </AuthRoute>
      ) : (
        <ElementComponent />
      )}
    </>
  );
};

export default RouteWrapper;
