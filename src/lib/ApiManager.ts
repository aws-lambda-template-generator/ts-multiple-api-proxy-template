import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

export interface IApiManager<T> {
  makeRequest(apiOptions: AxiosRequestConfig): AxiosPromise;
}

export class ApiManager<T> implements IApiManager<T> {

  makeRequest(apiOptions: AxiosRequestConfig): AxiosPromise {
    return axios(apiOptions)
      .then(response => response)
      .catch(err => {
        throw new Error(err);
      });
  }
}