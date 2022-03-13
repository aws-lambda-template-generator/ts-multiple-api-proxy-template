import { expect } from 'chai';
import sinon from 'sinon';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { ApiOptions } from '../../models/ApiOptions';
import { ApiOptionsManager } from '../../lib/ApiOptionsManager';
import { ApiManager, IApiManager } from '../../lib/ApiManager';
import { UsersServices } from '../UsersServices';
import { IApiOptions } from '../../models';
import { IUser, IAddUser, IGetAllUsersResponse, IGetUserResponse, IAddUserResponse } from '../../models/UserModel';
import { IPost, IAddPost, IGetAllPostsResponse, IGetPostResponse } from '../../models/PostModel';
import { PostsServices } from '../PostsServices';
import { RequestRouter } from '../RequestRouter';

describe('RequestRouter', () => {
  beforeEach(() => {
    sinon.stub(console, 'log');
  });

  afterEach(() => {
    (console.log as any).restore();
  });

  describe('routeRequest()', () => {
    it('should call getUsers() to retrive all users', async () => {
      // arrange
      const apiOptions = new ApiOptions();
      const apiOptionManager = new ApiOptionsManager();
      const apiManager = new ApiManager();
      const usersServices = new UsersServices(
        apiOptions as IApiOptions<IUser>,
        apiOptionManager,
        apiManager as IApiManager<IUser[]>,
      );
      const postsServices = new PostsServices(
        apiOptions as IApiOptions<IPost>,
        apiOptionManager,
        apiManager as IApiManager<IPost[]>,
      );
      const requestRouter = new RequestRouter(postsServices, usersServices);
      const expectedOuptput = { status: 200, data: [] } as IGetAllUsersResponse;
      sinon.stub(UsersServices.prototype, 'getAllUsers').resolves(expectedOuptput);
      const getAllUsersEvent = {
        httpMethod: 'get',
        body: '',
        path: '/get-users',
      };

      //act
      const usersData = await requestRouter.routeRequests(getAllUsersEvent as any);

      // assert
      expect(usersData).to.deep.equal(expectedOuptput);

      (UsersServices.prototype.getAllUsers as any).restore();
    });

    it('should call getUser() to retrive a user by id', async () => {
      // arrange
      const apiOptions = new ApiOptions();
      const apiOptionManager = new ApiOptionsManager();
      const apiManager = new ApiManager();
      const usersServices = new UsersServices(
        apiOptions as IApiOptions<IUser>,
        apiOptionManager,
        apiManager as IApiManager<IUser>,
      );
      const postsServices = new PostsServices(
        apiOptions as IApiOptions<IPost>,
        apiOptionManager,
        apiManager as IApiManager<IPost>,
      );
      const requestRouter = new RequestRouter(postsServices, usersServices);
      const expectedOuptput = { status: 200, data: {} } as IGetUserResponse;
      sinon.stub(UsersServices.prototype, 'getUser').resolves(expectedOuptput);
      const getUserEvent = {
        httpMethod: 'get',
        body: '',
        path: '/get-user/1',
      } as APIGatewayProxyEvent;

      //act
      const usersData = await requestRouter.routeRequests(getUserEvent);

      // assert
      expect(usersData).to.deep.equal(expectedOuptput);

      (UsersServices.prototype.getUser as any).restore();
    });

    it('should call addUser() to retrive a user by id', async () => {
      // arrange
      const apiOptions = new ApiOptions();
      const apiOptionManager = new ApiOptionsManager();
      const apiManager = new ApiManager();
      const usersServices = new UsersServices(
        apiOptions as IApiOptions<IUser>,
        apiOptionManager,
        apiManager as IApiManager<IAddUser>,
      );
      const postsServices = new PostsServices(
        apiOptions as IApiOptions<IPost>,
        apiOptionManager,
        apiManager as IApiManager<IAddPost>,
      );
      const requestRouter = new RequestRouter(postsServices, usersServices);
      const expectedOuptput = { status: 200, data: {} } as IAddUserResponse;
      sinon.stub(UsersServices.prototype, 'addUser').resolves(expectedOuptput);
      const addUserEvent = {
        httpMethod: 'post',
        body: '{}',
        path: '/add-user',
      } as APIGatewayProxyEvent;

      //act
      const usersData = await requestRouter.routeRequests(addUserEvent);

      // assert
      expect(usersData).to.deep.equal(expectedOuptput);

      (UsersServices.prototype.addUser as any).restore();
    });

    it('should call getPosts() to retrive all posts', async () => {
      // arrange
      const apiOptions = new ApiOptions();
      const apiOptionManager = new ApiOptionsManager();
      const apiManager = new ApiManager();
      const usersServices = new UsersServices(
        apiOptions as IApiOptions<IUser>,
        apiOptionManager,
        apiManager as IApiManager<IUser[]>,
      );
      const postsServices = new PostsServices(
        apiOptions as IApiOptions<IPost>,
        apiOptionManager,
        apiManager as IApiManager<IPost[]>,
      );
      const requestRouter = new RequestRouter(postsServices, usersServices);
      const expectedOuptput = { status: 200, data: [] } as IGetAllPostsResponse;
      sinon.stub(PostsServices.prototype, 'getAllPosts').resolves(expectedOuptput);
      const getAllUsersEvent = {
        httpMethod: 'get',
        body: '',
        path: '/get-posts',
      } as APIGatewayProxyEvent;

      //act
      const usersData = await requestRouter.routeRequests(getAllUsersEvent);

      // assert
      expect(usersData).to.deep.equal(expectedOuptput);

      (PostsServices.prototype.getAllPosts as any).restore();
    });

    it('should call getUser() to retrive a post by id', async () => {
      // arrange
      const apiOptions = new ApiOptions();
      const apiOptionManager = new ApiOptionsManager();
      const apiManager = new ApiManager();
      const usersServices = new UsersServices(
        apiOptions as IApiOptions<IUser>,
        apiOptionManager,
        apiManager as IApiManager<IUser>,
      );
      const postsServices = new PostsServices(
        apiOptions as IApiOptions<IPost>,
        apiOptionManager,
        apiManager as IApiManager<IPost>,
      );
      const requestRouter = new RequestRouter(postsServices, usersServices);
      const expectedOuptput = { status: 200, data: {} } as IGetPostResponse;
      sinon.stub(PostsServices.prototype, 'getPost').resolves(expectedOuptput);
      const getUserEvent = {
        httpMethod: 'get',
        body: '',
        path: '/get-post/1',
      } as APIGatewayProxyEvent;

      //act
      const usersData = await requestRouter.routeRequests(getUserEvent);

      // assert
      expect(usersData).to.deep.equal(expectedOuptput);

      (PostsServices.prototype.getPost as any).restore();
    });

    it('should call addUser() to retrive a user by id', async () => {
      // arrange
      const apiOptions = new ApiOptions();
      const apiOptionManager = new ApiOptionsManager();
      const apiManager = new ApiManager();
      const usersServices = new UsersServices(
        apiOptions as IApiOptions<IUser>,
        apiOptionManager,
        apiManager as IApiManager<IUser>,
      );
      const postsServices = new PostsServices(
        apiOptions as IApiOptions<IPost>,
        apiOptionManager,
        apiManager as IApiManager<IPost>,
      );
      const requestRouter = new RequestRouter(postsServices, usersServices);
      const expectedOuptput = { status: 200, data: {} } as IAddUserResponse;
      sinon.stub(PostsServices.prototype, 'addPost').resolves(expectedOuptput);
      const addUserEvent = {
        httpMethod: 'post',
        body: '{}',
        path: '/add-post',
      } as APIGatewayProxyEvent;

      //act
      const usersData = await requestRouter.routeRequests(addUserEvent);

      // assert
      expect(usersData).to.deep.equal(expectedOuptput);

      (PostsServices.prototype.addPost as any).restore();
    });
  });
});
