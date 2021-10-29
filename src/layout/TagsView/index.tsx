import appConfig from '@/configs/app';
import { useMount, useUpdateEffect } from '@/hooks';
import { useAppIntl } from '@/locales';
import { matchCurrentPageRoute, matchRouteKeyPaths } from '@/router/utils';
import { rootActions, useAppDispatch, useAppState } from '@/store';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Tag } from 'antd';
import { memo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.less';

interface LayoutTagsViewProps {}

const LayoutTagsView: React.FC<LayoutTagsViewProps> = props => {
  const { activeTag, cacheTags } = useAppState(state => state.system);
  const storeDispatch = useAppDispatch();
  const locationVal = useLocation();
  const navigate = useNavigate();
  const { f } = useAppIntl();

  type ActiveTag = Exclude<typeof activeTag, null>;
  const handleTagClose = (tag: ActiveTag) => {
    const { removeSpecifiedTag } = rootActions.system;

    storeDispatch(removeSpecifiedTag(tag));
  };

  const handleTagCloseAll = (tag: ActiveTag) => {
    const { removeAllTag } = rootActions.system;

    storeDispatch(removeAllTag());
  };

  const handleTagColseOther = (tag: ActiveTag) => {
    const { removeExceptSpecifiedTag } = rootActions.system;

    storeDispatch(removeExceptSpecifiedTag(tag));
  };

  // TODO: 留未来加入keep-alive后再跟进
  // const handleTagRefresh = (tag: ActiveTag) => {};

  const RightClickTagMenu: React.FC<{ clickTag: ActiveTag; isOnlyHome: boolean }> = ({
    clickTag,
    isOnlyHome
  }): JSX.Element =>
    isOnlyHome ? (
      <></>
    ) : (
      <Menu className="app-tags-view-menu">
        {/* <Menu.Item key="1" onClick={handleTagRefresh.bind(null, clickTag)}>
        {f('刷新')}
      </Menu.Item> */}
        <Menu.Item key="2" onClick={handleTagClose.bind(null, clickTag)}>
          {f('关闭')}
        </Menu.Item>
        <Menu.Item key="3" onClick={handleTagColseOther.bind(null, clickTag)}>
          {f('关闭其他')}
        </Menu.Item>
        <Menu.Item key="4" onClick={handleTagCloseAll.bind(null, clickTag)}>
          {f('关闭所有')}
        </Menu.Item>
      </Menu>
    );

  const handleTagSwitch = (tag: ActiveTag) => {
    const { switchOrAddActiveTag } = rootActions.system;

    storeDispatch(switchOrAddActiveTag(tag.key));
  };

  const updateCurrentPageTag = () => {
    const matchResult = matchCurrentPageRoute();

    // 无key，证明是根目录，无需更新
    if (!matchResult?.route.key) return;

    const { switchOrAddActiveTag } = rootActions.system;

    storeDispatch(switchOrAddActiveTag(matchResult.route.key));
  };

  useEffect(updateCurrentPageTag, [locationVal.pathname]);
  useMount(updateCurrentPageTag);

  useUpdateEffect(() => {
    if (cacheTags.length === 0) {
      navigate(appConfig.homePath);
      updateCurrentPageTag();
    }
  }, [cacheTags]);

  useUpdateEffect(() => {
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
    <div className="app-tags-view">
      {cacheTags.map(tag => {
        const isActiveTag = tag.key === activeTag?.key;
        const isOnlyHome = Boolean(tag.isHome && cacheTags.length === 1);

        return (
          <Dropdown
            overlayClassName="app-tags-view-dropdown"
            key={tag.key}
            overlay={<RightClickTagMenu isOnlyHome={isOnlyHome} clickTag={tag} />}
            trigger={['contextMenu']}
          >
            <Tag
              className="tag-item"
              closable={isOnlyHome ? false : isActiveTag}
              closeIcon={<CloseCircleOutlined className="tag-item-icon" />}
              color={isActiveTag ? 'success' : 'default'}
              onClose={handleTagClose.bind(null, tag)}
              onClick={handleTagSwitch.bind(null, tag)}
            >
              {tag.titleId && f(tag.titleId)}
            </Tag>
          </Dropdown>
        );
      })}
    </div>
  );
};

export default memo(LayoutTagsView);
