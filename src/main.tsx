import { ConfigProvider as AntdConfigProvider } from 'antd';
import 'antd/dist/antd.less';
import type { FC } from 'react';
import { Suspense } from 'react';
import { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider as ReduxProvider } from 'react-redux';
import { getAntdLocale, getAppLocale } from './locales';
import Router from './router';
import store, { rootThunks, useAppDispatch, useAppState } from './store';
import './styles/index.less';

const App: FC = () => {
  const { locale: currentLocale } = useAppState(state => state.system);
  const storeDispatch = useAppDispatch();

  useEffect(() => {
    const { user } = rootThunks;

    storeDispatch(user.initUserInfo());
  }, []);

  const initMessage = useMemo(() => getAppLocale(currentLocale), [currentLocale]);

  return (
    <Suspense fallback={<>有一种悲伤，是你的名字停留贼的过往</>}>
      <AntdConfigProvider locale={getAntdLocale(currentLocale)} componentSize="middle">
        <IntlProvider locale={currentLocale.split('_')[0]} messages={initMessage}>
          <Router />
        </IntlProvider>
      </AntdConfigProvider>
    </Suspense>
  );
};

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById('root')
);
