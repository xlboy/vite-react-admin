import type { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/mock/user/login',
    method: 'get',
    timeout: 50,
    response: {
      code: 0,
      data: { name: 'vben' }
    }
  }
] as MockMethod[];
