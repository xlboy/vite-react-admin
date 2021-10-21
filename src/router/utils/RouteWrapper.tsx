import { useAppIntl } from '@/locales';
import type { ComponentType } from 'react';
import { matchCurrentPageRoute } from '.';

interface RouteWrapperProps {
  element: React.LazyExoticComponent<ComponentType<{}>>;
}

const RouteWrapper: React.FC<RouteWrapperProps> = props => {
  const { element: ElementComponent } = props;
  const { f } = useAppIntl();

  const routeInfo = matchCurrentPageRoute();
  const { meta } = routeInfo?.route ?? {};

  const { titleId: routeTitleId } = meta ?? {};

  if (routeTitleId !== undefined) {
    document.title = f(routeTitleId);
  }

  return <ElementComponent />;
};

export default RouteWrapper;
