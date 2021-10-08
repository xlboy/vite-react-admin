type RouterTypes = 'hash' | 'history';

const appConfig = {
  routerMode: 'hash' as RouterTypes,
  mobileMaxWidth: 600,
  cacheKey: {
    locale: 'select_locale'
  }
} as const;

export default appConfig;
