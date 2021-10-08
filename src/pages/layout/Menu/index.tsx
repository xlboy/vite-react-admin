import { useAppDispatch, useAppState } from '@/store';
import rootActions from '@/store/rootActions';
import type { MenuProps } from 'antd';
import { Drawer, Layout, Menu } from 'antd';
import React, { memo } from 'react';
import './index.less';

const { SubMenu } = Menu;
const { Sider } = Layout;

interface LayoutMenu {}

const LayoutMenu: React.FC<LayoutMenu> = () => {
  const { isMenuCollapsed, isMobile } = useAppState(state => state.system);
  const storeDispatch = useAppDispatch();

  const handleMenuClick: MenuProps['onClick'] = info => {
    info.key;
  };

  const handleMenuClose = (): void => {
    const { setIsMenuCollapsed } = rootActions.system;

    storeDispatch(setIsMenuCollapsed(true));
  };

  const InsideComponent = (): JSX.Element => (
    <Menu theme="light" onClick={handleMenuClick} selectedKeys={['1']} mode="inline" className="app-menu">
      <SubMenu key="sub1" title="Navigation One">
        <Menu.Item key="1">Option 1</Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
        <Menu.Item key="3">Option 3</Menu.Item>
        <Menu.Item key="4">Option 4</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" title="Aavigation Two">
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="sub4" title="Cavigation Three">
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu>
    </Menu>
  );

  return isMobile ? (
    <Drawer
      width="200"
      placement="left"
      bodyStyle={{ padding: 0, height: '100%' }}
      closable={false}
      onClose={handleMenuClose}
      visible={!isMenuCollapsed}
    >
      <InsideComponent />
    </Drawer>
  ) : (
    <Sider collapsedWidth={60} collapsed={isMobile ? false : isMenuCollapsed} trigger={null} collapsible>
      <InsideComponent />
    </Sider>
  );
};

export default LayoutMenu;
