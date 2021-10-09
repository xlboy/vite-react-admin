import { useAppIntl } from '@/locales';
import { matchKeyRoutes } from '@/router/utils';
import { rootActions, useAppDispatch, useAppState } from '@/store';
import type { UserState } from '@/store/types/user';
import type { MenuProps } from 'antd';
import { Drawer, Layout, Menu } from 'antd';
import React from 'react';
import './index.less';

const { SubMenu } = Menu;
const { Sider } = Layout;

interface LayoutMenu {}

const LayoutMenu: React.FC<LayoutMenu> = () => {
  const { isMenuCollapsed, isMobile } = useAppState(state => state.system);
  const { menuList } = useAppState(state => state.user);
  const { f } = useAppIntl();
  const storeDispatch = useAppDispatch();

  const handleMenuClick: MenuProps['onClick'] = info => {
    info.key;
  };

  const handleMenuClose = (): void => {
    const { setIsMenuCollapsed } = rootActions.system;

    storeDispatch(setIsMenuCollapsed(true));
  };

  const renderTreeMenu = (menuList: UserState['menuList']): React.ReactNode =>
    menuList.map(menu => {
      const routeInfo = matchKeyRoutes('access', menu.access);

      if (!routeInfo) {
        throw new Error('菜单权限存在问题，menuList中存在routes未对应上的access值');
      }

      const { access, titleId, iconElement } = routeInfo;
      const isExistChildren = menu.children !== undefined && menu.children.length !== 0;

      return isExistChildren ? (
        <SubMenu key={access} title={f(titleId!)} icon={iconElement ?? null}>
          {renderTreeMenu(menu.children!)}
        </SubMenu>
      ) : (
        <Menu.Item key={access} icon={iconElement ?? null}>
          {f(titleId!)}
        </Menu.Item>
      );
    });

  const InsideComponent = (): JSX.Element => (
    <Menu theme="light" onClick={handleMenuClick} selectedKeys={[]} mode="inline" className="app-menu">
      {renderTreeMenu(menuList)}
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
