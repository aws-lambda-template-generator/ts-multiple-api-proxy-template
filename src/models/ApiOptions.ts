import {
  IApiMethod,
  IApiOptions,
  IHeaders
} from '.';

export class ApiOptions<T> implements IApiOptions<T> {

  private _method: IApiMethod;
  private _url: string;
  private _headers: IHeaders;
  private _data: T;

  get method(): IApiMethod {
    return this._method;
  }

  set method(method: IApiMethod) {
    this._method = method;
  }

  get url(): string {
    return this._url;
  }

  set url(url: string) {
    this._url = url;
  }

  get headers(): IHeaders {
    return this._headers;
  }

  set headers(headers: IHeaders) {
    this._headers = headers;
  }

  get data(): T {
    return this._data;
  }

  set data(data: T) {
    this._data = data;
  }
}