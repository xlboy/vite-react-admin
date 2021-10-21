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
        }
      ] as MenuItem[]
    }
  }
] as MockMethod[];
