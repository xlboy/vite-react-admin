import useStates from '@/hooks/useStates';
import { useActivate } from 'react-activation';

interface PermissionTest1Props {}

const PermissionTest1: React.FC<PermissionTest1Props> = props => {
  const [{ count }, setRootState] = useStates({
    count: 0
  });

  useActivate(() => {
    console.log('激活啦，草');
  });

  return (
    <div>
      {count}
      <button
        onClick={() => {
          setRootState(state => ({ count: ++state.count }));
        }}
      >
        哦
      </button>
    </div>
  );
};

export default PermissionTest1;
