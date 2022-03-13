import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

export interface IApiManager<T> {
  makeRequest(apiOptions: AxiosRequestConfig): AxiosPromise<T>;
}

export class ApiManager<T> implements IApiManager<T> {
  makeRequest(apiOptions: AxiosRequestConfig): AxiosPromise<T> {
    return axios(apiOptions)
      .then((response) => response)
      .catch((err) => {
        throw new Error(err);
      });
  }
}
