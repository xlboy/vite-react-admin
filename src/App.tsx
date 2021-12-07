import { ConfigProvider as AntdConfigProvider } from 'antd';
import 'antd/dist/antd.variable.less';
import type { FC } from 'react';
import { Suspense, useEffect, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import AppLoading from './components/App/Loading';
import { useMount } from './hooks';
import { getAntdLocale, getAppLocale } from './locales';
import Router, { appHistory } from './router';
import { rootThunks, useAppDispatch, useAppState } from './store';
import './styles/index.less';
import 'virtual:windi.css';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { systemActions } from './store/modules/system';

const isDev = import.meta.env.MODE === 'development';

const themes = {
  light: isDev ? '../node_modules/antd/dist/antd.less' : 'https://cdn.jsdelivr.net/npm/antd@4.17.2/dist/antd.css',
  dark: isDev
    ? '../node_modules/antd/dist/antd.dark.less'
    : 'https://cdn.jsdelivr.net/npm/antd@4.17.2/dist/antd.dark.css'
};

const App: FC = () => {
  const { locale: currentLocale, theme: currentTheme, mode } = useAppState(state => state.system);
  const storeDispatch = useAppDispatch();

  const setTheme = (dark = true) => {
    storeDispatch(
      systemActions.setSystemState({
        mode: dark ? 'dark' : 'light'
      })
    );
  };

  /** initial theme */
  useEffect(() => {
    setTheme(mode === 'dark');
    // watch system theme change
    if (!localStorage.getItem('theme')) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');

      function matchMode(e: MediaQueryListEvent) {
        setTheme(e.matches);
      }

      mql.addEventListener('change', matchMode);
    }
  }, []);

  useMount(async () => {
    try {
      const { initUserInfo } = rootThunks.user;

      await storeDispatch(initUserInfo());
    } catch (error) {
      appHistory.push('/login');
    }
  });

  useEffect(() => {
    AntdConfigProvider.config({
      theme: currentTheme
    });
  }, [currentTheme]);

  const initMessage = useMemo(() => getAppLocale(currentLocale), [currentLocale]);

  return (
    <IntlProvider locale={currentLocale.split('_')[0]} messages={initMessage}>
      <ThemeSwitcherProvider defaultTheme={mode} themeMap={themes}>
        <Suspense fallback={<AppLoading />}>
          <AntdConfigProvider locale={getAntdLocale(currentLocale)} componentSize="middle">
            <Router />
          </AntdConfigProvider>
        </Suspense>
      </ThemeSwitcherProvider>
    </IntlProvider>
  );
};

export default App;
