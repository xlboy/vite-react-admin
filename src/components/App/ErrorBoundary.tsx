import { useAppIntl } from '@/locales';
import { Button, Result } from 'antd';
import { useEffect, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface ErrorBoundaryProps {}

interface FallbackProps {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}

const FallbackComponent: React.FC<FallbackProps> = props => {
  const { resetErrorBoundary } = props;
  const { f } = useAppIntl();

  return (
    <Result
      status="error"
      title={f('页面加载异常')}
      subTitle={f('请刷新或返回重试，如若还有此类问题请联系开发人员')}
      extra={[
        <Button type="text" key="reload" onClick={() => location.reload()}>
          {f('刷新')}
        </Button>,
        <Button type="text" key="goBack" onClick={() => resetErrorBoundary()}>
          {f('返回')}
        </Button>
      ]}
    />
  );
};

const AppErrorBoundary: React.FC<ErrorBoundaryProps> = props => {
  const { children } = props;
  const errorBoundaryCall = useRef<() => void>();

  // 如若页面地址发生变化了，例：跳转页面、切换tag了。则回退状态且清掉异常
  useEffect(() => {
    errorBoundaryCall.current?.();
  }, [location.href]);

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => {
        errorBoundaryCall.current = resetErrorBoundary;

        return <FallbackComponent error={error} resetErrorBoundary={resetErrorBoundary} />;
      }}
      onError={error => console.dir(error)}
    >
      {children}
    </ErrorBoundary>
  );
};

export default AppErrorBoundary;
