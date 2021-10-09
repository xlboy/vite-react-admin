/**
 * @description http-status码的文案配置
 * 索引 0 -> 简体中文， 1 -> 繁体， 2 -> 英文
 */

export default {
  401: ['请登录再进行操作', '請登錄再進行操作', 'Please log in and try again'],
  403: ['登录过期，请重新登录', '登錄過期，請重新登錄', 'Login expired. Please log in again'],
  404: ['请求地址不存在', '請求地址不存在', 'The requested address does not exist']
} as const;
