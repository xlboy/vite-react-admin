type RouterTypes = 'hash' | 'history';

const appConfig = {
  name: 'react-admin',
  homePath: '/dashboard',
  routerMode: 'hash' as RouterTypes,
  mobileMaxWidth: 600,
  cacheKey: {
    locale: 'app_select_locale',
    theme: 'app_theme'
  }
} as const;

export default appConfig;
