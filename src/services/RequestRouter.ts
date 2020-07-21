import { IPostsServices } from './PostsServices';
import { IUsersServices } from './UsersServices';
import { IEventPayload } from '../models';
import { Helpers } from '../lib/Helpers';
import {
  GET_USERS,
  GET_USER,
  GET_POSTS,
  GET_POST,
  POST,
  GET,
  RESPONSE_HEADER
} from '../constants';

export interface IRequestRouter {
  routeRequests(event: IEventPayload): Promise<any>;
  routeUsersRequests(method, body, path): Promise<any>;
  routePostsRequests(method, body, path): Promise<any>;
}

export class RequestRouter implements IRequestRouter {

  private readonly _postsServices: IPostsServices;
  private readonly _usersServices: IUsersServices;

  constructor(postsServices: IPostsServices, usersServices: IUsersServices) {
    this._postsServices = postsServices;
    this._usersServices = usersServices;
  }

  async routeRequests(event: IEventPayload): Promise<any> {
    const { method, body, path } = event;
    try {
      if (this.isUserEndpoint(path)) {
        return await this.routeUsersRequests(method, body, path);
      } else {
        return await this.routePostsRequests(method, body, path);
      }
    } catch (e) {
      console.log('Error while processing request: ', e);
      return {
        status: 500,
        data: 'Server Error'
      };
    }
  }

  async routeUsersRequests(method, body, path): Promise<any> {

    if (path.toLowerCase().includes(GET_USERS)
    && method.toLowerCase() === GET ) {
      const users = await this._usersServices.getAllUsers();
      return users;
    } else if (path.toLowerCase().includes(GET_USER)
    && method.toLowerCase() === GET) {
      const id = Helpers.getUrlParameter(path);
      const user = await this._usersServices.getUser(id);
      return user;
    } else if (path.toLowerCase().includes(GET_USER)
    && method.toLowerCase() === POST) {
      const postResponse = await this._usersServices.addUser(JSON.parse(body));
      return postResponse;
    }
  }

  async routePostsRequests(method, body, path): Promise<any> {
    if (path.toLowerCase().includes(GET_POSTS)
    && method.toLowerCase() === GET ) {
      const users = await this._postsServices.getAllPosts();
      return users;
    } else if (path.toLowerCase().includes(GET_POST)
    && method.toLowerCase() === GET) {
      const id = Helpers.getUrlParameter(path);
      const user = await this._postsServices.getPost(id);
      return user;
    } else if (path.toLowerCase().includes(GET_USER)
    && method.toLowerCase() === POST) {
      const postResponse = await this._postsServices.addPost(JSON.parse(body));
      return postResponse;
    }
  }

  private isUserEndpoint(path: string): boolean {
    return path.toLowerCase().includes(GET_USER);
  }
}