import { APIGatewayProxyEvent } from 'aws-lambda';
import { IPostsServices } from './PostsServices';
import { IUsersServices } from './UsersServices';
import { Helpers } from '../lib/Helpers';
import { GET_USERS, GET_USER, ADD_USER, GET_POSTS, GET_POST, ADD_POST, POST, GET } from '../constants';

export interface IRequestRouter {
  routeRequests(event: APIGatewayProxyEvent): Promise<any>;
}

export class RequestRouter implements IRequestRouter {
  private readonly _postsServices: IPostsServices;

  private readonly _usersServices: IUsersServices;

  constructor(postsServices: IPostsServices, usersServices: IUsersServices) {
    this._postsServices = postsServices;
    this._usersServices = usersServices;
  }

  async routeRequests(event: APIGatewayProxyEvent): Promise<any> {
    const { httpMethod, body, path } = event;
    try {
      if (this.isUserEndpoint(path)) {
        return this.routeUsersRequests(httpMethod, body, path);
      } else {
        return this.routePostsRequests(httpMethod, body, path);
      }
    } catch (e) {
      console.log('Error while processing request: ', e);
      return {
        status: 500,
        data: 'Server Error: ' + e,
      };
    }
  }

  private async routeUsersRequests(httpMethod, body, path): Promise<any> {
    if (path.toLowerCase().includes(GET_USERS) && httpMethod.toLowerCase() === GET) {
      const users = await this._usersServices.getAllUsers();
      return users;
    } else if (path.toLowerCase().includes(GET_USER) && httpMethod.toLowerCase() === GET) {
      const id = Helpers.getUrlParameter(path);
      const user = await this._usersServices.getUser(id);
      return user;
    } else if (path.toLowerCase().includes(ADD_USER) && httpMethod.toLowerCase() === POST) {
      const postResponse = await this._usersServices.addUser(JSON.parse(body));
      return postResponse;
    }
  }

  private async routePostsRequests(httpMethod, body, path): Promise<any> {
    if (path.toLowerCase().includes(GET_POSTS) && httpMethod.toLowerCase() === GET) {
      const users = await this._postsServices.getAllPosts();
      return users;
    } else if (path.toLowerCase().includes(GET_POST) && httpMethod.toLowerCase() === GET) {
      const id = Helpers.getUrlParameter(path);
      const user = await this._postsServices.getPost(id);
      return user;
    } else if (path.toLowerCase().includes(ADD_POST) && httpMethod.toLowerCase() === POST) {
      const postResponse = await this._postsServices.addPost(JSON.parse(body));
      return postResponse;
    }
  }

  private isUserEndpoint(path: string): boolean {
    return path.toLowerCase().includes(GET_USER) || path.toLowerCase().includes(ADD_USER);
  }
}
