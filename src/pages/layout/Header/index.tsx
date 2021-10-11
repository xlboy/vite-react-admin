import appConfig from '@/configs/app';
import { useAppIntl } from '@/locales';
import { matchCurrentPageRoutes } from '@/router/utils';
import { useAppDispatch, useAppState } from '@/store';
import { rootActions } from '@/store';
import { Layout, message } from 'antd';
import { useMemo } from 'react';
import { useLocation } from 'react-router';
import { ReactComponent as IconAntd } from './assets/icon-antd.svg';
import HeaderBreadcrumb from './components/Breadcrumb';
import MenuCollapsedIcon from './components/MenuCollapsedIcon';
import SwitchLanguage from './components/SwitchLanguage';
import UserMenu from './components/UserMenu';
import './index.less';
import type { RouteInfos, SwitchCurrentLocale } from './types';

const { Header } = Layout;

interface LayoutHeaderProps {}

const LayoutHeader: React.FC<LayoutHeaderProps> = () => {
  const { isMobile, isMenuCollapsed, locale: currentLocale } = useAppState(state => state.system);
  const storeDispatch = useAppDispatch();
  const { f } = useAppIntl();
  const locationVal = useLocation();

  const routeInfos: RouteInfos = useMemo(() => {
    const matchResult = matchCurrentPageRoutes();

    return (
      matchResult?.map(({ pathname, route: { titleId } }) => ({
        title: titleId ? f(titleId) : '',
        path: pathname
      })) ?? []
    );
  }, [locationVal]);

  const switchIsMenuCollapsed = () => {
    const { setIsMenuCollapsed } = rootActions.system;

    storeDispatch(setIsMenuCollapsed());
  };

  const switchCurrentLocale: SwitchCurrentLocale = (locale, label) => {
    const { setLocale } = rootActions.system;

    message.success(f('切换{locale}成功', { locale: label }));
    localStorage.setItem(appConfig.cacheKey.locale, locale);
    storeDispatch(setLocale(locale));
  };

  return (
    <Header className="app-header">
      <div className="app-header-left-menu">
        {!isMobile && (
          <div className="app-header-logo">
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
        <SwitchLanguage switchCurrentLocale={switchCurrentLocale} currentLocale={currentLocale} />
        <UserMenu />
      </div>
    </Header>
  );
};

export default LayoutHeader;
