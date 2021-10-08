import type UserInterface from './user.interface';
import BaseService from '../base.service';

const serviceModuleName = '/user';

class UserService extends BaseService implements UserInterface {
  constructor() {
    super(serviceModuleName);
  }

  login: UserInterface['login'] = params =>
    this.request({
      url: '/login',
      params
    });
}

export default new UserService();
