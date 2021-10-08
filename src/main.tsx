import { ConfigProvider as AntdConfigProvider } from 'antd';
import 'antd/dist/antd.less';
import type { FC } from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider as ReduxProvider } from 'react-redux';
import { getAntdLocale, getAppLocale } from './locales';
import Router from './router';
import store, { useAppState } from './store';
import './styles/index.less';

const App: FC = () => {
  const { locale: currentLocale } = useAppState(state => state.system);

  return (
    <AntdConfigProvider locale={getAntdLocale(currentLocale)} componentSize="middle">
      <IntlProvider locale={currentLocale.split('_')[0]} messages={getAppLocale(currentLocale)}>
        <Router />
      </IntlProvider>
    </AntdConfigProvider>
  );
};

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById('root')
);
