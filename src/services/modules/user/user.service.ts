import BaseService from '../base.service';
import type UserInterface from './user.interface';

const serviceModuleName = '/user';

class UserService extends BaseService implements UserInterface {
  constructor() {
    super(serviceModuleName);
  }

  getMenuList: UserInterface['getMenuList'] = () =>
    this.request({
      baseURL: '/mock',
      method: 'GET',
      url: '/menu'
    });

  login: UserInterface['login'] = params =>
    this.request({
      baseURL: '/mock',
      method: 'GET',
      url: '/login',
      params
    });
}

export default new UserService();
