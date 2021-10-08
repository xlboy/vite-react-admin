import { useLocale } from '@/locales';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router';

const NotFoundPage: React.FC = () => {
  const { f } = useLocale();
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle={f('对不起，您访问的页面不存在。')}
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          {f('返回首页')}
        </Button>
      }
    ></Result>
  );
};

export default NotFoundPage;
