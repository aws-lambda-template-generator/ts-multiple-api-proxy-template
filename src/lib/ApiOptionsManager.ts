import { AxiosRequestConfig } from 'axios';

import {
  IApiOptions,
  IApiOptionsSimpleGet
} from '../models';

export interface IApiOptionsManager<T> {
  createApiSimpleGetOptions(apiOptions: IApiOptions<T>): AxiosRequestConfig;
}

export class ApiOptionsManager<T> implements IApiOptionsManager<T> {

  createApiSimpleGetOptions(apiOptions: IApiOptions<T>): AxiosRequestConfig {
    return {
      method: apiOptions.method,
      url: apiOptions.url,
      headers: apiOptions.headers
    };
  }
}