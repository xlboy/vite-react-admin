export interface APIBaseFormat<T = null> {
  code: number;
  data: T;
}

export type APIRespNormalFormat<T> = Promise<APIBaseFormat<T>>;
