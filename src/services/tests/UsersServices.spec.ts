import sinon from 'sinon';
import { expect } from 'chai';
import { AxiosRequestConfig } from 'axios';
import { UsersServices } from '../UsersServices';
import { ApiOptions } from '../../models/ApiOptions';
import { IApiOptions } from '../../models';
import { IUser } from '../../models/UserModel';
import { ApiOptionsManager } from '../../lib/ApiOptionsManager';
import { ApiManager } from '../../lib/ApiManager';
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
      const apiOptions = new ApiOptions() as IApiOptions<IUser>;
      const apiOptionsManager = new ApiOptionsManager();
      const apiManager = new ApiManager();
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
      const userServices = new UsersServices(apiOptions, apiOptionsManager, apiManager);

      // act
      const posts = await userServices.getAllUsers();
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
      const apiOptions = new ApiOptions() as IApiOptions<IUser>;
      const apiOptionsManager = new ApiOptionsManager();
      const apiManager = new ApiManager();
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
      const usersServices = new UsersServices(apiOptions, apiOptionsManager, apiManager);

      // act
      const user = await usersServices.getUser('1');

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
      const apiOptions = new ApiOptions() as IApiOptions<IUser>;
      const apiOptionsManager = new ApiOptionsManager();
      const apiManager = new ApiManager();
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
      };
      const expectedOutput = {
        status: 200,
        data: { id: 1 },
      };
      const postMockData = { id: 1 } as IUser;
      sinon.stub(ApiOptionsManager.prototype, 'createApiSimpleGetOptions').returns(mockOptions);
      sinon
        .stub(ApiManager.prototype, 'makeRequest')
        .withArgs(apiOptionsManager.createApiSimpleGetOptions(apiOptions))
        .resolves(expectedAxiosOutput);
      const usersServices = new UsersServices(apiOptions, apiOptionsManager, apiManager);

      // act
      const user = await usersServices.addUser(postMockData);

      // assert
      expect(user).to.deep.equal(expectedOutput);

      (ApiOptionsManager.prototype.createApiSimpleGetOptions as any).restore();
      (ApiManager.prototype.makeRequest as any).restore();
    });
  });
});
