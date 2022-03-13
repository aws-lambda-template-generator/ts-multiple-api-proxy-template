import { IApiOptions } from '../models';

import { IGetAllPostsResponse, IGetPostResponse, IAddPostResponse, IPost, IAddPost } from '../models/PostModel';

import { GET, POST, POSTS_URL, BASIC_CONTENT_TYPE_ONLY_HEADERS } from '../constants';

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

  private readonly _apiManager: IApiManager<IPost[]> | IApiManager<IPost> | IApiManager<IAddPost>;

  constructor(
    apiOptions: IApiOptions<IPost>,
    apiOptionsManager: IApiOptionsManager<IPost>,
    apiManager: IApiManager<IPost[]> | IApiManager<IPost> | IApiManager<IAddPost>,
  ) {
    this._apiOptions = apiOptions;
    this._apiOptionsManager = apiOptionsManager;
    this._apiManager = apiManager;
  }

  async getAllPosts(): Promise<IGetAllPostsResponse> {
    this._apiOptions.method = GET;
    this._apiOptions.url = POSTS_URL;
    this._apiOptions.headers = BASIC_CONTENT_TYPE_ONLY_HEADERS;
    const options = this._apiOptionsManager.createApiSimpleGetOptions(this._apiOptions);
    const posts = await this._apiManager.makeRequest(options);
    // console.log('checking posts data: ', posts);
    return {
      status: posts.status,
      data: posts.data as IPost[],
    };
  }

  async getPost(id: string): Promise<IGetPostResponse> {
    this._apiOptions.method = GET;
    this._apiOptions.url = POSTS_URL + `/${id}`;
    this._apiOptions.headers = BASIC_CONTENT_TYPE_ONLY_HEADERS;
    const options = this._apiOptionsManager.createApiSimpleGetOptions(this._apiOptions);
    const post = await this._apiManager.makeRequest(options);
    // console.log('checking post data: ', post);
    return {
      status: post.status,
      data: post.data as IPost,
    };
  }

  async addPost(postData: IPost): Promise<IAddPostResponse> {
    this._apiOptions.method = POST;
    this._apiOptions.url = POSTS_URL;
    this._apiOptions.headers = BASIC_CONTENT_TYPE_ONLY_HEADERS;
    this._apiOptions.data = postData;
    const options = this._apiOptionsManager.createApiSimpleGetOptions(this._apiOptions);
    const postResponse = await this._apiManager.makeRequest(options);
    // console.log('checking post response in addPost(): ', postResponse);
    return {
      status: postResponse.status,
      data: postResponse.data as IAddPost,
    };
  }
}
