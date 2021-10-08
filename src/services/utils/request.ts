import { message } from 'antd';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import type { APIBaseFormat } from '../types';

const AxiosInstance = axios.create({
  baseURL: '/v1',
  timeout: 25000
});

AxiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  config => {
    console.log(config);

    if (config?.data) {
    }

    return config?.data;
  },
  error => {
    let errorMessage = '系统异常';

    if (error?.message?.includes('Network Error')) {
      errorMessage = '网络错误，请检查您的网络';
    } else {
      errorMessage = error?.message;
    }

    console.dir(error);
    error.message && message.error(errorMessage);

    return {
      status: false,
      message: errorMessage,
      result: null
    };
  }
);

export const request = <RespData = null>(config: AxiosRequestConfig) =>
  AxiosInstance(config) as unknown as Promise<APIBaseFormat<RespData>>;
