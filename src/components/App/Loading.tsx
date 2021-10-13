import { Spin } from 'antd';

interface AppLoadingProps {}

const AppLoading: React.FC<AppLoadingProps> = () => {
  return (
    <div className="app-loading">
      <Spin />
    </div>
  );
};

export default AppLoading;
