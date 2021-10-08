import { request as _request } from '../utils/request';

class BaseService {
  protected request: typeof _request = config =>
    _request({
      ...config,
      url: this.moduleName + config.url
    });

  constructor(private readonly moduleName: string, options?: Record<string, any>) {}
}

export default BaseService;
