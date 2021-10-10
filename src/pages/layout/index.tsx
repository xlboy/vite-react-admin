import appConfig from '@/configs/app';
import { matchCurrentPageRoute } from '@/router/utils';
import { useAppDispatch } from '@/store';
import { rootActions } from '@/store/';
import type { SystemState } from '@/store/types/system';
import { Layout } from 'antd';
import _ from 'lodash';
import React, { useEffect } from 'react';
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
  const locationVal = useLocation();
  const navigate = useNavigate();

  const updateCurrentPageTag = () => {
    const matchResult = matchCurrentPageRoute();

    console.log('matchResult', matchResult);

    const { switchOrAddActiveTag } = rootActions.system;

    storeDispatch(
      switchOrAddActiveTag(
        _.pick(matchResult?.route, ['key', 'titleId', 'path']) as Exclude<SystemState['activeTag'], null>
      )
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
  }, []);

  useEffect(() => {
    if (locationVal.pathname === '/') {
      navigate('dashboard');
      updateCurrentPageTag();
    }
  }, [locationVal]);

  return (
    <Layout className="app-layout">
      <Header />
      <Layout>
        <Menu />
        <Content>
          <TagsView />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
