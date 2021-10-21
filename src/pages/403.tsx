import { useAppIntl } from '@/locales';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router';

interface NoPermissionPageProps {}

const NoPermissionPage: React.FC<NoPermissionPageProps> = () => {
  const { f } = useAppIntl();
  const navigate = useNavigate();

  return (
    <Result
      status="403"
      title="403"
      subTitle={f('对不起，您没有权限访问此页。')}
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          {f('返回')}
        </Button>
      }
    ></Result>
  );
};

export default NoPermissionPage;
