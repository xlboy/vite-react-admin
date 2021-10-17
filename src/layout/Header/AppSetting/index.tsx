import appConfig from '@/configs/app';
import useStates from '@/hooks/useStates';
import { useAppIntl } from '@/locales';
import { rootActions, useAppDispatch, useAppState } from '@/store';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import { memo, useCallback } from 'react';
import type { ThemeSetupProps } from './Theme';
import ThemeSetup from './Theme';

interface AppSettingProps {}

const AppSetting: React.FC<AppSettingProps> = () => {
  const [{ isSettingVisible }, setRootState] = useStates({
    isSettingVisible: false
  });
  const systemState = useAppState(state => state.system);
  const { f } = useAppIntl();
  const storeDispatch = useAppDispatch();

  const handleOpenSetting = () => {
    setRootState({ isSettingVisible: true });
  };

  const handleCloseSetting = () => {
    setRootState({ isSettingVisible: false });
  };

  const ThemeSetupModule: React.ReactNode = (() => {
    const { theme } = systemState;
    const handleThemeChange: ThemeSetupProps['handleThemeChange'] = useCallback(theme => {
      const { setTheme } = rootActions.system;

      localStorage.setItem(appConfig.cacheKey.theme, JSON.stringify(theme));
      storeDispatch(setTheme(theme));
    }, []);

    return <ThemeSetup handleThemeChange={handleThemeChange} theme={theme} />;
  })();

  return (
    <>
      <Button type="text" icon={<SettingOutlined />} style={{ height: '100%' }} onClick={handleOpenSetting}></Button>
      <Drawer
        width="300"
        placement="right"
        title={f('设置')}
        bodyStyle={{ padding: 20, height: '100%' }}
        closable={false}
        destroyOnClose
        onClose={handleCloseSetting}
        visible={isSettingVisible}
      >
        {ThemeSetupModule}
      </Drawer>
    </>
  );
};

export default memo(AppSetting);
