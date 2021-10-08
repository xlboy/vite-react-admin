import appConfig from '@/configs/app';
import { useAppDispatch } from '@/store';
import rootActions from '@/store/rootActions';
import { Layout } from 'antd';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Header from './Header';
import './index.less';
import Menu from './Menu';

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
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
