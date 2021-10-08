import type { APIRespNormalFormat } from '@/services/types';

export default interface UserInterface {
  /**
   * 用户登录 - GET
   */
  login(data: { username: string; password: string }): APIRespNormalFormat<boolean>;
}
