import appConfig from '@/configs/app';
import { useMount, useUpdateEffect } from '@/hooks';
import { useAppState } from '@/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { notLoginRoutePaths } from '..';

interface RouteChangeWrapperProps {}

const RouteChangeWrapper: React.FC<RouteChangeWrapperProps> = props => {
  const { userInfo } = useAppState(state => state.user);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useUpdateEffect(
    function listenUrlChange() {
      if (userInfo !== null && pathname === '/') {
        navigate(appConfig.homePath);
      } else if (userInfo === null && !notLoginRoutePaths.includes(pathname!)) {
        navigate('/login');
      }
    },
    [pathname]
  );

  useMount(() => {
    if (pathname === '/') {
      navigate(appConfig.homePath);
    }
  });

  return <>{props.children}</>;
};

export default RouteChangeWrapper;
