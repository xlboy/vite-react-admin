import { useLocale } from '@/locales';
import { Button, Dropdown, Menu } from 'antd';

interface UserMenuProps {}

const UserMenu: React.FC<UserMenuProps> = () => {
  const { f } = useLocale();

  const DropdownMenu = (): JSX.Element => (
    <Menu>
      <Menu.Item key="1">{f('个人中心')}</Menu.Item>
      <Menu.Item key="2">{f('退出登录')}</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={<DropdownMenu />} placement="bottomCenter" arrow>
      <Button type="text" style={{ height: '100%' }}>
        admin
      </Button>
    </Dropdown>
  );
};

export default UserMenu;
