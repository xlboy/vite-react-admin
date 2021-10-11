import { useAppIntl } from '@/locales';
import type { RouteItem as _RouteItem } from '@/router';
import { matchKeyRoute, matchRouteKeyPaths } from '@/router/utils';
import { rootActions, useAppDispatch, useAppState } from '@/store';
import type { SystemState } from '@/store/types/system';
import type { MenuItem, UserState } from '@/store/types/user';
import { Drawer, Layout, Menu } from 'antd';
import _ from 'lodash';
import React, { memo, useCallback, useMemo } from 'react';
import './index.less';

const { SubMenu } = Menu;
const { Sider } = Layout;

interface LayoutMenu {}

type RouteInfo = _RouteItem & SystemState['activeTag'];

const LayoutMenu: React.FC<LayoutMenu> = () => {
  const { isMenuCollapsed, isMobile, activeTag } = useAppState(state => state.system);
  const { menuList } = useAppState(state => state.user);
  const storeDispatch = useAppDispatch();

  const handleMenuClick = useCallback((routeInfo: RouteInfo) => {
    const isJump = routeInfo.element;

    if (isJump) {
      const { switchOrAddActiveTag } = rootActions.system;

      storeDispatch(switchOrAddActiveTag(_.pick(routeInfo, ['key', 'titleId', 'path'])));
    }
  }, []);

  const handleMenuClose = (): void => {
    const { setIsMenuCollapsed } = rootActions.system;

    storeDispatch(setIsMenuCollapsed(true));
  };

  const menuSelectedKeys: string[] = useMemo(() => {
    const currentTagKey = activeTag?.key;

    if (currentTagKey === undefined) return [];

    const matchResult = matchRouteKeyPaths(currentTagKey);

    const selectdKeys = matchResult.map(item => item.key).filter(key => !!key);

    return selectdKeys as string[];
  }, [activeTag]);

  const renderMenu = (): JSX.Element => (
    <InsideComponent menuList={menuList} menuSelectedKeys={menuSelectedKeys} handleMenuClick={handleMenuClick} />
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
      {renderMenu()}
    </Drawer>
  ) : (
    <Sider collapsedWidth={60} collapsed={isMobile ? false : isMenuCollapsed} trigger={null} collapsible>
      {renderMenu()}
    </Sider>
  );
};

interface InsideComponentProps {
  menuSelectedKeys: string[];
  handleMenuClick(routeInfo: RouteInfo): void;
  menuList: MenuItem[];
}

const InsideComponent: React.FC<InsideComponentProps> = memo(props => {
  const { menuSelectedKeys, handleMenuClick, menuList } = props;
  const { f } = useAppIntl();

  const renderTreeMenu = (menuList: UserState['menuList']): React.ReactNode =>
    menuList.map(menu => {
      const routeInfo = matchKeyRoute('key', menu.key) as RouteInfo | undefined;

      if (!routeInfo) {
        throw new Error('菜单权限存在问题，menuList中存在routes未对应上的key值');
      }

      const { key, titleId, iconElement } = routeInfo;
      const { children: menuChildren } = menu;
      const isExistChildren = menuChildren !== undefined && menuChildren.length !== 0;

      return isExistChildren ? (
        <SubMenu
          key={key}
          title={f(titleId!)}
          icon={iconElement ?? null}
          onTitleClick={handleMenuClick.bind(null, routeInfo)}
        >
          {renderTreeMenu(menuChildren)}
        </SubMenu>
      ) : (
        <Menu.Item key={key} icon={iconElement ?? null} onClick={handleMenuClick.bind(null, routeInfo)}>
          {f(titleId!)}
        </Menu.Item>
      );
    });

  return (
    <Menu
      theme="light"
      defaultOpenKeys={menuSelectedKeys}
      selectedKeys={menuSelectedKeys}
      mode="inline"
      className="app-menu"
    >
      {renderTreeMenu(menuList)}
    </Menu>
  );
});

export default LayoutMenu;
