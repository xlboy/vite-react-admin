import { useAppDispatch, useAppState } from '@/store';
import { systemActions } from '@/store/modules/system';
import { Button, Tooltip } from 'antd';
import { createElement } from 'react';
import { ReactComponent as DarkIcon } from '@/assets/icons/moon.svg';
import { ReactComponent as LightIcon } from '@/assets/icons/sun.svg';

const ThemeModeSwitch: React.FC = () => {
  const { mode } = useAppState(state => state.system);
  const storeDispatch = useAppDispatch();

  const onChangeTheme = () => {
    const newTheme = mode === 'dark' ? 'light' : 'dark';

    localStorage.setItem('theme', newTheme);
    storeDispatch(
      systemActions.setSystemState({
        mode: newTheme
      })
    );
  };

  return (
    <Tooltip title={`切换至${mode === 'dark' ? '浅色' : '深色'}`}>
      <Button onClick={onChangeTheme} type="text" icon={createElement(mode === 'dark' ? LightIcon : DarkIcon)} />
    </Tooltip>
  );
};

export default ThemeModeSwitch;
