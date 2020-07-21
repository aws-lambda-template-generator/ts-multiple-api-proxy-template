import {
  IApiOptions,
} from '../models';

import {
  IGetAllPostsResponse,
  IGetPostResponse,
  IAddPostResponse,
  IPost
} from '../models/PostModel';

import {
  GET,
  POST,
  POSTS_URL,
  BASIC_CONTENT_TYPE_ONLY_HEADERS
} from '../constants';

import { IApiOptionsManager } from '../lib/ApiOptionsManager';
import { IApiManager } from '../lib/ApiManager';

export interface IPostsServices {
  getAllPosts(): Promise<IGetAllPostsResponse>;
  getPost(id: string): Promise<IGetPostResponse>;
  addPost(userData: IPost): Promise<IAddPostResponse>;
}

export class PostsServices implements IPostsServices {

  private readonly _apiOptions: IApiOptions<IPost>;
  private readonly _apiOptionsManager: IApiOptionsManager<IPost>;
  private readonly _apiServiceManager: IApiManager<IPost>;

  constructor(apiOptions: IApiOptions<IPost>,
    apiOptionsManager: IApiOptionsManager<IPost>,
    apiServiceManager: IApiManager<IPost>) {
      this._apiOptions = apiOptions;
      this._apiOptionsManager = apiOptionsManager;
      this._apiServiceManager = apiServiceManager;
    }

  async getAllPosts(): Promise<IGetAllPostsResponse> {
    this._apiOptions.method = GET;
    this._apiOptions.url = POSTS_URL;
    this._apiOptions.headers = BASIC_CONTENT_TYPE_ONLY_HEADERS;
    const options = this._apiOptionsManager
      .createApiSimpleGetOptions(this._apiOptions);
    const posts = await this._apiServiceManager.makeRequest(options);
    return {
      status: posts.status,
      data: posts.data
    };
  }

  async getPost(id: string): Promise<IGetPostResponse> {
    this._apiOptions.method = GET;
    this._apiOptions.url = POSTS_URL + `/${id}`;
    this._apiOptions.headers = BASIC_CONTENT_TYPE_ONLY_HEADERS;
    const options = this._apiOptionsManager
      .createApiSimpleGetOptions(this._apiOptions);
    const post = await this._apiServiceManager.makeRequest(options);
    return {
      status: post.status,
      data: post.data
    };
  }

  async addPost(postData: IPost): Promise<IAddPostResponse> {
    this._apiOptions.method = POST;
    this._apiOptions.url = POSTS_URL;
    this._apiOptions.headers = BASIC_CONTENT_TYPE_ONLY_HEADERS;
    this._apiOptions.data = postData;
    const options = this._apiOptionsManager
      .createApiSimpleGetOptions(this._apiOptions);
    const postResponse = await this._apiServiceManager.makeRequest(options);
    return {
      status: postResponse.status,
      data: postResponse.data
    };
  }
}