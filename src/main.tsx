import { ConfigProvider as AntdConfigProvider } from 'antd';
import 'antd/dist/antd.variable.less';
import type { FC } from 'react';
import { Suspense, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider as ReduxProvider } from 'react-redux';
import AppErrorBoundary from './components/App/ErrorBoundary';
import AppLoading from './components/App/Loading';
import { getAntdLocale, getAppLocale } from './locales';
import Router from './router';
import store, { rootThunks, useAppDispatch, useAppState } from './store';
import './styles/index.less';

const App: FC = () => {
  const { locale: currentLocale, theme: currentTheme } = useAppState(state => state.system);
  const storeDispatch = useAppDispatch();

  useEffect(() => {
    const { user } = rootThunks;

    storeDispatch(user.initUserInfo());
  }, []);

  useEffect(() => {
    AntdConfigProvider.config({
      theme: currentTheme
    });
  }, [currentTheme]);

  const initMessage = useMemo(() => getAppLocale(currentLocale), [currentLocale]);

  return (
    <IntlProvider locale={currentLocale.split('_')[0]} messages={initMessage}>
      <AppErrorBoundary>
        <Suspense fallback={<AppLoading />}>
          <AntdConfigProvider locale={getAntdLocale(currentLocale)} componentSize="middle">
            <Router />
          </AntdConfigProvider>
        </Suspense>
      </AppErrorBoundary>
    </IntlProvider>
  );
};

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById('root')
);
