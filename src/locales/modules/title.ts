import _ from 'lodash';
import systemLocale from './system';

/**
 * @description 页面标题的文案配置
 * 索引 0 -> 简体中文， 1 -> 繁体， 2 -> 英文
 */

export default {
  ..._.pick(systemLocale, ['登录']),
  首页: ['首页', '首頁', 'Dashboard'],
  权限测试: ['权限测试', '權限測試', 'Permission test'],
  测试1: ['测试1', '测试1', 'Test 1'],
  测试2: ['测试2', '测试2', 'Test 2'],
  测试3: ['测试3', '测试3', 'Test 3'],
  测试4: ['测试4', '测试4', 'Test 4'],
  '404 - 找不到页面': ['404 - 找不到页面', '404 - 找不到頁面', '404 - Page not found'],
  异常处理: ['异常处理', '異常處理', 'Error handle']
} as const;
