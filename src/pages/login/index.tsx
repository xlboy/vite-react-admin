import SwitchLanguage from '@/layout/SwitchLanguage';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import './index.less';
import { ReactComponent as IconAntd } from '@/assets/icons/icon-antd.svg';

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const handleFormSubmit = () => {
    console.log('最怕只剩，自己不没有你');
  };

  return (
    <div className="login-page">
      <div className="locale-switch">
        <SwitchLanguage />
      </div>
      <div className="login-model">
        <div className="login-model-logo">
          <IconAntd className="login-model-logo__icon" />
        </div>
        <Form onFinish={handleFormSubmit}>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input prefix={<LockOutlined />} type="password" />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button type="primary" block htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
