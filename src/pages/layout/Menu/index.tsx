import useStates from '@/hooks/useStates';
import { useAppIntl } from '@/locales';
import type { RouteItem as _RouteItem } from '@/router';
import { matchKeyRoute, matchRouteKeyPaths } from '@/router/utils';
import { rootActions, useAppDispatch, useAppState } from '@/store';
import type { SystemState } from '@/store/types/system';
import type { UserState } from '@/store/types/user';
import { Drawer, Layout, Menu } from 'antd';
import _ from 'lodash';
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import './index.less';

const { SubMenu } = Menu;

const { Sider } = Layout;

interface LayoutMenu {}

type RouteInfo = _RouteItem & SystemState['activeTag'];

interface InsideComponentProps {
  handleMenuClick(routeInfo: RouteInfo): void;
  menuList: UserState['menuList'];
  openKeys: string[];
  selectedKeys: string[];
  handleDropDownOpen(keys: React.Key[]): void;
}

const InsideComponent: React.FC<InsideComponentProps> = memo(props => {
  const { menuList, handleMenuClick, handleDropDownOpen, openKeys, selectedKeys } = props;
  const { f } = useAppIntl();

  const renderTreeMenu = (menuList: UserState['menuList']): React.ReactNode =>
    menuList.map(menu => {
      const routeInfo = matchKeyRoute('key', menu.key) as RouteInfo | undefined;

      if (!routeInfo) {
        throw new Error('菜单权限存在问题，menuList中存在routes未对应上的key值');
      }

      const {
        key,
        meta: { iconElement, titleId }
      } = routeInfo;

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
      // 如若用↓方的受控方式，在collapsed状态下会有问题
      // openKeys={openKeys}
      selectedKeys={selectedKeys}
      defaultOpenKeys={openKeys}
      mode="inline"
      className="app-menu"
      onOpenChange={handleDropDownOpen}
    >
      {renderTreeMenu(menuList)}
    </Menu>
  );
});

const LayoutMenu: React.FC<LayoutMenu> = () => {
  const { activeTag, isMenuCollapsed, isMobile } = useAppState(state => state.system);
  const { menuList } = useAppState(state => state.user);
  const storeDispatch = useAppDispatch();
  const [{ openKeys, selectedKeys }, setRootState] = useStates({
    openKeys: [] as string[],
    selectedKeys: [] as string[]
  });

  const handleMenuClose = (): void => {
    const { setIsMenuCollapsed } = rootActions.system;

    storeDispatch(setIsMenuCollapsed(true));
  };

  const handleMenuClick = useCallback((routeInfo: RouteInfo) => {
    const isJump = routeInfo.element;

    if (isJump) {
      const { switchOrAddActiveTag } = rootActions.system;

      storeDispatch(
        switchOrAddActiveTag({
          ..._.pick(routeInfo, ['key', 'path']),
          titleId: routeInfo.meta.titleId
        })
      );
    }
  }, []);

  const handleDropDownOpen = useCallback((keys: React.Key[]) => {
    setRootState(state => ({
      openKeys: [...new Set([...state.openKeys, ...(keys as string[])])]
    }));
  }, []);

  useEffect(() => {
    const currentActiveTagKey = activeTag?.key;

    if (currentActiveTagKey === undefined) return;

    const matchResult = matchRouteKeyPaths(currentActiveTagKey);
    const selectdKeys = matchResult.map(item => item.key).filter(key => !!key) as string[];

    setRootState(state => ({
      openKeys: [...new Set([...state.openKeys, ...selectdKeys.slice(0, selectdKeys.length - 1)])],
      selectedKeys: [selectdKeys.at(-1) ?? '']
    }));
  }, [activeTag?.key]);

  const renderCoreMenu = (
    <InsideComponent
      handleMenuClick={handleMenuClick}
      menuList={menuList}
      openKeys={openKeys}
      handleDropDownOpen={handleDropDownOpen}
      selectedKeys={selectedKeys}
    />
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
      {renderCoreMenu}
    </Drawer>
  ) : (
    <Sider collapsedWidth={60} collapsed={isMobile ? false : isMenuCollapsed} trigger={null} collapsible>
      {renderCoreMenu}
    </Sider>
  );
};

export default memo(LayoutMenu);
