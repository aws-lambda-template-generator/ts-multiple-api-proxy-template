import {
  IApiOptions
} from '../models';

import {
  IGetAllUsersResponse,
  IGetUserResponse,
  IAddUserResponse,
  IUser
} from '../models/UserModel';

import {
  GET,
  POST,
  USER_URL,
  BASIC_CONTENT_TYPE_ONLY_HEADERS
} from '../constants';

import { IApiOptionsManager } from '../lib/ApiOptionsManager';
import { IApiManager } from '../lib/ApiManager';

export interface IUsersServices {
  getAllUsers(): Promise<IGetAllUsersResponse>;
  getUser(id: string): Promise<IGetUserResponse>;
  addUser(userData: IUser): Promise<IAddUserResponse>;
}

export class UsersServices implements IUsersServices {

  private readonly _apiOptions: IApiOptions<IUser>;
  private readonly _apiOptionsManager: IApiOptionsManager<IUser>;
  private readonly _apiServiceManager: IApiManager<IUser>;

  constructor(apiOptions: IApiOptions<IUser>,
    apiOptionsManager: IApiOptionsManager<IUser>,
    apiServiceManager: IApiManager<IUser>) {
      this._apiOptions = apiOptions;
      this._apiOptionsManager = apiOptionsManager;
      this._apiServiceManager = apiServiceManager;
    }

  async getAllUsers(): Promise<IGetAllUsersResponse> {
    this._apiOptions.method = GET;
    this._apiOptions.url = USER_URL;
    this._apiOptions.headers = BASIC_CONTENT_TYPE_ONLY_HEADERS;
    const options = this._apiOptionsManager
      .createApiSimpleGetOptions(this._apiOptions);
    const users = await this._apiServiceManager.makeRequest(options);
    return {
      status: users.status,
      data: users.data
    };
  }

  async getUser(id: string): Promise<IGetUserResponse> {
    this._apiOptions.method = GET;
    this._apiOptions.url = USER_URL + `/${id}`;
    this._apiOptions.headers = BASIC_CONTENT_TYPE_ONLY_HEADERS;
    const options = this._apiOptionsManager
      .createApiSimpleGetOptions(this._apiOptions);
    const user = await this._apiServiceManager.makeRequest(options);
    return {
      status: user.status,
      data: user.data
    };
  }

  async addUser(userData: IUser): Promise<IAddUserResponse> {
    this._apiOptions.method = POST;
    this._apiOptions.url = USER_URL;
    this._apiOptions.headers = BASIC_CONTENT_TYPE_ONLY_HEADERS;
    this._apiOptions.data = userData;
    const options = this._apiOptionsManager
      .createApiSimpleGetOptions(this._apiOptions);
    const postResponse = await this._apiServiceManager.makeRequest(options);
    return {
      status: postResponse.status,
      data: postResponse.data
    };
  }
}