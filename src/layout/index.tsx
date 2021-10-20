import AppErrorBoundary from '@/components/App/ErrorBoundary';
import AppLoading from '@/components/App/Loading';
import appConfig from '@/configs/app';
import { matchCurrentPageRoute, matchRouteKeyPaths } from '@/router/utils';
import { useAppDispatch, useAppState } from '@/store';
import { rootActions } from '@/store/';
import type { SystemState } from '@/store/types/system';
import { Layout } from 'antd';
import _ from 'lodash';
import React, { Suspense, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import './index.less';
import Menu from './Menu';
import TagsView from './TagsView';

const { Content } = Layout;

interface LayoutPageProps {}

const LayoutPage: React.FC<LayoutPageProps> = () => {
  const storeDispatch = useAppDispatch();
  const { cacheTags, activeTag } = useAppState(state => state.system);
  const locationVal = useLocation();
  const navigate = useNavigate();
  const isInitFinish = useRef(false);

  const updateCurrentPageTag = () => {
    const matchResult = matchCurrentPageRoute();

    // 无key，证明是根目录，无需更新
    if (!matchResult?.route.key) return;

    const { switchOrAddActiveTag } = rootActions.system;

    storeDispatch(switchOrAddActiveTag(matchResult.route.key));
  };

  useEffect(() => {
    const handleMobileSize = () => {
      const rect = document.body.getBoundingClientRect();
      const isMobile = rect.width < appConfig.mobileMaxWidth;
      const { setIsMobile, setIsMenuCollapsed } = rootActions.system;

      storeDispatch(setIsMobile(isMobile));

      if (isMobile) {
        storeDispatch(setIsMenuCollapsed(true));
      }
    };

    if (locationVal.pathname === '/') {
      navigate('dashboard');
    }

    window.onresize = handleMobileSize;
    handleMobileSize();
    updateCurrentPageTag();
    // 为使组件首次挂载完成前不进行 cacheTags、activeTag 相关的 Effect 初始化
    Promise.resolve().then(() => (isInitFinish.current = true));
  }, []);

  useEffect(() => {
    if (locationVal.pathname === '/') {
      navigate('dashboard');
    }

    updateCurrentPageTag();
  }, [locationVal.pathname, locationVal.hash]);

  useEffect(() => {
    if (!isInitFinish.current) return;
    if (cacheTags.length === 0) {
      navigate('dashboard');
      updateCurrentPageTag();
    }
  }, [cacheTags]);

  useEffect(() => {
    if (!isInitFinish.current) return;
    if (activeTag) {
      const matchResult = matchRouteKeyPaths(activeTag.key);
      const filterTagPath = matchResult
        .map(item => item.path)
        .join('/')
        .replace(/\/{2,}/g, '/');

      navigate(filterTagPath);
    }
  }, [activeTag?.key]);

  return (
    <Layout className="app-layout">
      <Header />
      <Layout>
        <Menu />
        <Content className="app-layout-content">
          <TagsView />
          <div className="app-layout-content-inside">
            <AppErrorBoundary>
              <Suspense fallback={<AppLoading />}>
                <Outlet />
              </Suspense>
            </AppErrorBoundary>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;