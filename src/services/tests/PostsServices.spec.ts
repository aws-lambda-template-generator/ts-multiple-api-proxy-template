import sinon from 'sinon';
import { expect } from 'chai';
import { AxiosRequestConfig } from 'axios';
import { PostsServices } from '../PostsServices';
import { ApiOptions } from '../../models/ApiOptions';
import { IApiOptions } from '../../models';
import { IPost, IAddPost } from '../../models/PostModel';
import { ApiOptionsManager } from '../../lib/ApiOptionsManager';
import { ApiManager, IApiManager } from '../../lib/ApiManager';
import { GET, POST, BASIC_CONTENT_TYPE_ONLY_HEADERS } from '../../constants';

describe('PostsServices', () => {
  beforeEach(() => {
    sinon.stub(console, 'log');
  });

  afterEach(() => {
    (console.log as any).restore();
  });
  describe('getAllPosts()', () => {
    it('should return all post data', async () => {
      // arrange
      const mockUrl = 'hello.world';
      const apiOptions = new ApiOptions() as IApiOptions<IPost>;
      const apiOptionsManager = new ApiOptionsManager();
      const apiManager = new ApiManager() as IApiManager<IPost[]>;
      const expectedAxiosOutput = {
        statusText: 'success',
        headers: {},
        config: {},
        data: { id: 1 },
        status: 200,
      };
      const mockOptions: AxiosRequestConfig = {
        method: GET,
        url: mockUrl,
        headers: BASIC_CONTENT_TYPE_ONLY_HEADERS,
      };
      const expectedOutput = {
        status: 200,
        data: { id: 1 },
      };
      sinon.stub(ApiOptionsManager.prototype, 'createApiSimpleGetOptions').returns(mockOptions);
      sinon
        .stub(ApiManager.prototype, 'makeRequest')
        .withArgs(apiOptionsManager.createApiSimpleGetOptions(apiOptions))
        .resolves(expectedAxiosOutput);
      const postsServices = new PostsServices(apiOptions, apiOptionsManager, apiManager);

      // act
      const posts = await postsServices.getAllPosts();
      // assert
      expect(posts).to.deep.equal(expectedOutput);

      (ApiOptionsManager.prototype.createApiSimpleGetOptions as any).restore();
      (ApiManager.prototype.makeRequest as any).restore();
    });
  });

  describe('getPost()', () => {
    it('should return post data for an id', async () => {
      // arrange
      const mockUrl = 'hello.world/get-user/1';
      const apiOptions = new ApiOptions() as IApiOptions<IPost>;
      const apiOptionsManager = new ApiOptionsManager();
      const apiManager = new ApiManager() as IApiManager<IPost>;
      const expectedAxiosOutput = {
        statusText: 'success',
        headers: {},
        config: {},
        data: { id: 1 },
        status: 200,
      };
      const mockOptions: AxiosRequestConfig = {
        method: GET,
        url: mockUrl,
        headers: BASIC_CONTENT_TYPE_ONLY_HEADERS,
      };
      const expectedOutput = {
        status: 200,
        data: { id: 1 },
      };
      sinon.stub(ApiOptionsManager.prototype, 'createApiSimpleGetOptions').returns(mockOptions);
      sinon
        .stub(ApiManager.prototype, 'makeRequest')
        .withArgs(apiOptionsManager.createApiSimpleGetOptions(apiOptions))
        .resolves(expectedAxiosOutput);
      const postsServices = new PostsServices(apiOptions, apiOptionsManager, apiManager);

      // act
      const user = await postsServices.getPost('1');

      // assert
      expect(user).to.deep.equal(expectedOutput);

      (ApiOptionsManager.prototype.createApiSimpleGetOptions as any).restore();
      (ApiManager.prototype.makeRequest as any).restore();
    });
  });

  describe('addPost()', () => {
    it('should add post data with returning correct response', async () => {
      // arrange
      const mockUrl = 'hello.world/add-user';
      const apiOptions = new ApiOptions() as IApiOptions<IPost>;
      const apiOptionsManager = new ApiOptionsManager();
      const apiManager = new ApiManager() as IApiManager<IAddPost>;
      const expectedAxiosOutput = {
        statusText: 'success',
        headers: {},
        config: {},
        data: { id: 1 },
        status: 200,
      };
      const mockOptions: AxiosRequestConfig = {
        method: POST,
        url: mockUrl,
        headers: BASIC_CONTENT_TYPE_ONLY_HEADERS,
        data: {},
      };
      const expectedOutput = {
        status: 200,
        data: { id: 1 },
      };
      const postMockData = { id: 1 } as IPost;
      sinon.stub(ApiOptionsManager.prototype, 'createApiSimpleGetOptions').returns(mockOptions);
      sinon.stub(ApiManager.prototype, 'makeRequest').withArgs(mockOptions).resolves(expectedAxiosOutput);
      const postsServices = new PostsServices(apiOptions, apiOptionsManager, apiManager);

      // act
      const postsAddReqponse = await postsServices.addPost(postMockData);

      // assert
      expect(postsAddReqponse).to.deep.equal(expectedOutput);

      (ApiOptionsManager.prototype.createApiSimpleGetOptions as any).restore();
      (ApiManager.prototype.makeRequest as any).restore();
    });
  });
});
