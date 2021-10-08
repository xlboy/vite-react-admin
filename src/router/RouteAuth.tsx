import { useAppState } from '@/store';
import type { RouteProps } from 'react-router';

interface RouteAuthProps extends RouteProps {}

const RouteAuth: React.FC<RouteAuthProps> = props => {
  const { menuList } = useAppState(state => state.user);

  return <div></div>;
};

export default RouteAuth;
