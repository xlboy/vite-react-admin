import AppErrorBoundary from '@/components/App/ErrorBoundary';
import AppLoading from '@/components/App/Loading';
import appConfig from '@/configs/app';
import { useAppDispatch } from '@/store';
import { rootActions } from '@/store/';
import { Layout } from 'antd';
import React, { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router';
import ContentAuth from './ContentAuth';
import Header from './Header';
import './index.less';
import Menu from './Menu';
import TagsView from './TagsView';

const { Content } = Layout;

interface LayoutPageProps {}

const LayoutPage: React.FC<LayoutPageProps> = () => {
  const storeDispatch = useAppDispatch();

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
  }, []);

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
                <ContentAuth>
                  <Outlet />
                </ContentAuth>
              </Suspense>
            </AppErrorBoundary>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
