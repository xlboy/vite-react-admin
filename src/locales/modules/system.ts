/**
 * @description App相关的文案配置
 * 索引 0 -> 简体中文， 1 -> 繁体， 2 -> 英文
 */

export default {
  小: ['小', '小', 'Small'],
  中: ['中', '中', 'Middle'],
  大: ['大', '大', 'Big'],
  '对不起，您访问的页面不存在。': [
    '对不起，您访问的页面不存在。',
    '對不起，您訪問的頁面不存在。',
    'Sorry, the page you visited does not exist.'
  ],
  '对不起，您没有权限访问此页。': [
    '对不起，您没有权限访问此页。',
    '對不起，您沒有權限訪問此頁。',
    'Sorry, you are not authorized to access this page.'
  ],
  去登录: ['去登录', '去登錄', 'Go To Login'],
  登录: ['登录', '登錄', 'Login'],
  返回首页: ['返回首页', '返回首頁', 'Back Home'],
  个人中心: ['个人中心', '個人中心', 'Profile'],
  退出登录: ['退出登录', '退出登錄', 'Log out']
} as const;
