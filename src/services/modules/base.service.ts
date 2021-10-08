import type { AxiosRequestConfig } from 'axios';
import type { APIRespNormalFormat } from '../types';
import { request as _request } from '../utils/request';

export interface BaseInterface {
  /**
   * 服务的模块名称
   */
  moduleName: string;
  request<RespData = null>(config: Omit<AxiosRequestConfig, 'baseURL'>): APIRespNormalFormat<RespData>;
}

class BaseService {
  request: BaseInterface['request'] = config =>
    _request({
      baseURL: this.moduleName,
      ...config
    });

  constructor(private readonly moduleName: string, options?: Record<string, any>) {}
}

export default BaseService;
