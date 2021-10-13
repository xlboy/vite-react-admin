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

    storeDispatch(
      switchOrAddActiveTag({
        ..._.pick(matchResult.route, ['key', 'path']),
        titleId: matchResult.route.meta.titleId
      } as Exclude<SystemState['activeTag'], null>)
    );
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

    window.onresize = handleMobileSize;
    handleMobileSize();
    updateCurrentPageTag();
    // updateCurrentPageTag内dispatch执行后，未能将最新状态更新同步到其他地方，不得将isInitFinish值赋为true。
    // 通过异步机制，确保最新状态更新同步到其他地方了再设为true
    Promise.resolve().then(() => (isInitFinish.current = true));
  }, []);

  useEffect(() => {
    if (!isInitFinish.current) return;
    if (locationVal.pathname === '/') {
      navigate('dashboard');
    }

    updateCurrentPageTag();
  }, [locationVal.pathname, locationVal.hash]);

  useEffect(() => {
    if (cacheTags.length === 0 && isInitFinish.current) {
      navigate('dashboard');
      updateCurrentPageTag();
    }
  }, [cacheTags]);

  useEffect(() => {
    if (activeTag) {
      const matchResult = matchRouteKeyPaths(activeTag.key);
      const tagPath = matchResult.map(item => item.path);

      navigate(tagPath.join(''));
    }
  }, [activeTag?.key]);

  return (
    <Layout className="app-layout">
      <Header />
      <Layout>
        <Menu />
        <Content>
          <TagsView />
          <Suspense fallback={<div>等待</div>}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
