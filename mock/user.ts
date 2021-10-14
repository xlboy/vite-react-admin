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
          key: 'DASHBOARD',
          name: '首页'
        },
        {
          id: 'permission',
          key: 'PERMISSION',
          name: '权限测试',
          children: [
            {
              id: 'permission_test_1',
              key: 'PERMISSION_TEST_1',
              name: '测试1'
            },
            {
              id: 'permission_test_2',
              key: 'PERMISSION_TEST_2',
              name: '测试2',
              children: [
                {
                  id: 'permission_test_3',
                  key: 'PERMISSION_TEST_3',
                  name: '测试3'
                },
                {
                  id: 'permission_test_4',
                  key: 'PERMISSION_TEST_4',
                  name: '测试4'
                }
              ]
            }
          ]
        },
        {
          id: 'errorHandle',
          key: 'ERROR_HANDLE',
          name: '异常处理'
        }
      ] as MenuItem[]
    }
  }
] as MockMethod[];
