import appConfig from '@/configs/app';
import { useAppDispatch } from '@/store';
import { rootActions } from '@/store/';
import { Layout } from 'antd';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import './index.less';
import Menu from './Menu';

const { Content } = Layout;

interface LayoutPageProps {}

const LayoutPage: React.FC<LayoutPageProps> = () => {
  const storeDispatch = useAppDispatch();
  const locationVal = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (locationVal.pathname === '/') {
      navigate('dashboard');
    }
  }, [locationVal]);

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
