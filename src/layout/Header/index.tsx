import { ReactComponent as IconAntd } from '@/assets/icons/icon-antd.svg';
import SwitchLanguage from '@/layout/SwitchLanguage';
import { useAppIntl } from '@/locales';
import { matchCurrentPageRoutes } from '@/router/utils';
import { rootActions, useAppDispatch, useAppState } from '@/store';
import { Layout } from 'antd';
import classNames from 'classnames';
import { memo, useMemo } from 'react';
import { useLocation } from 'react-router';
import AppSetting from './AppSetting';
import HeaderBreadcrumb from './components/Breadcrumb';
import MenuCollapsedIcon from './components/MenuCollapsedIcon';
import UserMenu from './components/UserMenu';
import './index.less';
import type { RouteInfos } from './types';

const { Header } = Layout;

interface LayoutHeaderProps {}

const LayoutHeader: React.FC<LayoutHeaderProps> = () => {
  const { isMobile, isMenuCollapsed } = useAppState(state => state.system);
  const storeDispatch = useAppDispatch();
  const { f } = useAppIntl();
  const locationVal = useLocation();

  const routeInfos: RouteInfos = useMemo(() => {
    const matchResult = matchCurrentPageRoutes();

    return (
      matchResult?.map(({ pathname, route: { meta } }) => ({
        title: meta?.titleId ? f(meta.titleId) : '',
        path: pathname
      })) ?? []
    );
  }, [locationVal]);

  const switchIsMenuCollapsed = () => {
    const { setIsMenuCollapsed } = rootActions.system;

    storeDispatch(setIsMenuCollapsed());
  };

  return (
    <Header className="app-header">
      <div className="app-header-left-menu">
        {!isMobile && (
          <div className={classNames('app-header-logo', { collapsed: isMenuCollapsed })}>
            <IconAntd className="icon" />
          </div>
        )}
        <MenuCollapsedIcon
          isMenuCollapsed={isMenuCollapsed}
          isMobile={isMobile}
          switchIsMenuCollapsed={switchIsMenuCollapsed}
        />
        <HeaderBreadcrumb routeInfos={routeInfos} />
      </div>
      <div className="app-header-right-menu">
        <SwitchLanguage />
        <UserMenu />
        <AppSetting />
      </div>
    </Header>
  );
};

export default memo(LayoutHeader);
