import type { MockMethod } from 'vite-plugin-mock';
import type { MenuItem } from '../src/store/types/user';

export default [
  {
    url: '/mock/user/login',
    method: 'get',
    timeout: 50,
    response: {
      code: 0,
      data: { name: 'vben' }
    }
  },
  {
    url: '/mock/user/menu',
    method: 'get',
    timeout: 50,
    response: {
      code: 0,
      data: [
        {
          id: 'dashboard',
          access: 'DASHBOARD',
          name: '首页'
        },
        {
          id: 'permission',
          access: 'PERMISSION',
          name: '权限测试',
          children: [
            {
              id: 'permission_test_1',
              access: 'PERMISSION_TEST_1',
              name: '测试1'
            },
            {
              id: 'permission_test_2',
              access: 'PERMISSION_TEST_2',
              name: '测试2'
            }
          ]
        }
      ] as MenuItem[]
    }
  }
] as MockMethod[];
