import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import type { RouteInfos } from '../types';

interface BreadcrumbProps {
  routeInfos: RouteInfos;
}

const HeaderBreadcrumb: React.FC<BreadcrumbProps> = props => {
  const { routeInfos } = props;

  if (routeInfos.length === 1) {
    return null;
  }

  return (
    <Breadcrumb>
      {routeInfos.map((item, index) => {
        const { title, path, isSubMenuRoute } = item;
        const isLast = index === routeInfos.length - 1;
        const isFirstOneAndRootPath = index === 0 && path === '/';

        return (
          <Breadcrumb.Item key={title}>
            {isFirstOneAndRootPath ? (
              <Link to={path}>
                <HomeOutlined />
              </Link>
            ) : isLast || isSubMenuRoute ? (
              title
            ) : (
              <Link to={path}>{title}</Link>
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default HeaderBreadcrumb;
