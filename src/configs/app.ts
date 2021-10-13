type RouterTypes = 'hash' | 'history';

const appConfig = {
  routerMode: 'hash' as RouterTypes,
  mobileMaxWidth: 600,
  cacheKey: {
    locale: 'app_select_locale',
    theme: 'app_theme'
  }
} as const;

export default appConfig;
