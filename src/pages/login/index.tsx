import { UserService } from '@/services';

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = props => {
  return (
    <div>
      <button
        onClick={async () => {
          const res = await UserService.login({ username: '', password: '' });

          console.log('res', res);
        }}
      >
        请求示例
      </button>
    </div>
  );
};

export default LoginPage;
