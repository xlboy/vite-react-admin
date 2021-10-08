import _ from 'lodash';
import systemLocale from './system';

/**
 * @description 页面标题的文案配置
 * 索引 0 -> 简体中文， 1 -> 繁体， 2 -> 英文
 */

export default {
  ..._.pick(systemLocale, ['登录']),
  首页: ['首页', '首頁', 'Dashboard'],
  '404 - 找不到页面': ['404 - 找不到页面', '404 - 找不到頁面', '404 - Page not found']
} as const;
