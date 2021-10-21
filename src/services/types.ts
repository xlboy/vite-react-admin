export interface APIBaseFormat<T = null> {
  code: number;
  data: T;
}

export type APIRespNormalFormat<T> = Promise<APIBaseFormat<T>>;

export type { default as UserType } from './modules/user/user.type';
