import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

interface MenuCollapsedIconProps {
  isMobile: boolean;
  isMenuCollapsed: boolean;
  switchIsMenuCollapsed(): void;
}

const MenuCollapsedIcon: React.FC<MenuCollapsedIconProps> = props => {
  const { isMenuCollapsed, isMobile, switchIsMenuCollapsed } = props;
  const menuIconStyle: React.CSSProperties = {
    cursor: 'pointer',
    fontSize: 18,
    marginLeft: 20,
    marginRight: 10,
    display: 'block'
  };

  return (
    <span onClick={switchIsMenuCollapsed}>
      {(isMobile ? true : isMenuCollapsed) ? (
        <MenuUnfoldOutlined style={menuIconStyle} />
      ) : (
        <MenuFoldOutlined style={menuIconStyle} />
      )}
    </span>
  );
};

export default MenuCollapsedIcon;
