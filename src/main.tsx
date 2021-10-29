import { ConfigProvider as AntdConfigProvider } from 'antd';
import 'antd/dist/antd.variable.less';
import type { FC } from 'react';
import { Suspense, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider as ReduxProvider } from 'react-redux';
import AppLoading from './components/App/Loading';
import { useMount } from './hooks';
import { getAntdLocale, getAppLocale } from './locales';
import Router, { appHistory } from './router';
import store, { rootThunks, useAppDispatch, useAppState } from './store';
import './styles/index.less';

const App: FC = () => {
  const { locale: currentLocale, theme: currentTheme } = useAppState(state => state.system);
  const storeDispatch = useAppDispatch();

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
      <Suspense fallback={<AppLoading />}>
        <AntdConfigProvider locale={getAntdLocale(currentLocale)} componentSize="middle">
          <Router />
        </AntdConfigProvider>
      </Suspense>
    </IntlProvider>
  );
};

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById('root')
);
