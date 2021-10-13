import appConfig from '@/configs/app';
import useStates from '@/hooks/useStates';
import { useAppIntl } from '@/locales';
import { rootActions, useAppDispatch, useAppState } from '@/store';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Divider, Drawer } from 'antd';
import { useCallback } from 'react';
import { SketchPicker } from 'react-color';
import type { ThemeSetupProps } from './Theme';
import ThemeSetup from './Theme';

interface AppSettingProps {}

const AppSetting: React.FC<AppSettingProps> = props => {
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

  const ThemeModule: React.FC = (() => {
    const { theme } = systemState;
    const handleThemeChange: ThemeSetupProps['handleThemeChange'] = useCallback(theme => {
      const { setTheme } = rootActions.system;

      localStorage.setItem(appConfig.cacheKey.theme, JSON.stringify(theme));
      storeDispatch(setTheme(theme));
    }, []);

    return () => <ThemeSetup theme={theme} handleThemeChange={handleThemeChange} />;
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
        onClose={handleCloseSetting}
        visible={isSettingVisible}
      >
        <ThemeModule />
      </Drawer>
    </>
  );
};

export default AppSetting;
