import type { APIRespNormalFormat } from '@/services/types';
import type { MenuItem } from '@/store/types/user';

export default interface UserInterface {
  /**
   * @description 用户登录 - GET
   */
  login(data: { username: string; password: string }): APIRespNormalFormat<boolean>;

  /**
   * @description 获取用户菜单 - GET
   */
  getMenuList(): APIRespNormalFormat<MenuItem[]>;
}
