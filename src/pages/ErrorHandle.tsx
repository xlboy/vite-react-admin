import { useStates } from '@/hooks';

interface ErrorHandleProps {}

const Test = (() => {}) as unknown as React.FC;

const ErrorHandle: React.FC<ErrorHandleProps> = () => {
  const [{ isShow }, setStates] = useStates({
    isShow: false
  });

  return (
    <div>
      <button
        onClick={() => {
          setStates({ isShow: true });
        }}
      >
        change
      </button>
      {isShow && <Test />}
    </div>
  );
};

export default ErrorHandle;
