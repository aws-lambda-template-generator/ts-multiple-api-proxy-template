export type IApiMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface IApiOptions<T> {
  method: IApiMethod;
  url: string;
  headers: IHeaders;
  data: T;
}

export interface IApiOptionsSimpleGet<T> {
  method: IApiMethod;
  url: string;
  headers: T;
}

// header models - keep adding optional header properties as we encounter differnt headers
export interface IHeaders {
  'content-type'?: string;
  'auth-token'?: string;
}

// Lambda models

export interface ILambdaResponse {
  statusCode: number;
  headers: {};
  body: string;
  isBase64Encoded: boolean;
}

export interface ICallback {
  (error: any, result: ILambdaResponse): void;
}
