import NoPermissionPage from '@/pages/403';
import { matchCurrentPageRoute } from '@/router/utils';
import { useAppState } from '@/store';
import type { MenuItem } from '@/store/types/user';
import React, { useMemo } from 'react';

interface ContentAuthProps {}

const ContentAuth: React.FC<ContentAuthProps> = props => {
  const { menuList } = useAppState(state => state.user);

  const { isAuth, isExistMenu } = useMemo(() => {
    const matchRoute = matchCurrentPageRoute();
    const { isAuth } = matchRoute?.route.meta ?? {};

    const isExistMenu = (() => {
      const routeKey = matchRoute?.route.key;
      const verifyMenuExist = (_menuList: MenuItem[]): boolean => {
        return _menuList.some(menu => {
          if (menu.key === routeKey) {
            return true;
          } else if (menu.children?.length) {
            return verifyMenuExist(menu.children);
          }

          return false;
        });
      };

      return verifyMenuExist(menuList);
    })();

    return { isExistMenu, isAuth };
  }, [location.href]);

  return <>{isAuth ? isExistMenu ? props.children : <NoPermissionPage /> : props.children}</>;
};

export default ContentAuth;
