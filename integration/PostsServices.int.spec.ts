import { expect } from 'chai';
import { ApiOptions } from '../src/models/ApiOptions';
import { ApiManager } from '../src/lib/ApiManager';
import { ApiOptionsManager } from '../src/lib/ApiOptionsManager';
import { PostsServices } from '../src/services/PostsServices';
import { IApiOptions } from '../src/models';
import { IPost } from '../src/models/PostModel';

describe('Integration test for UserServices', () => {
  describe('getAllPosts()', () => {
    it('should return output with successful get request', async() => {
      const apiOptions = new ApiOptions();
      const apiOptionsManager = new ApiOptionsManager();
      const apiManager = new ApiManager();

      const postsServices = new PostsServices(apiOptions as IApiOptions<IPost>, apiOptionsManager, apiManager);

      const users = await postsServices.getAllPosts();

      expect(users.data.length).to.be.gte(1);
      expect(users.status).to.equal(200);
    });
  });

  describe('getPost()', () => {
    it('should return output with successful get request', async() => {
      const apiOptions = new ApiOptions();
      const apiOptionsManager = new ApiOptionsManager();
      const apiManager = new ApiManager();

      const postsServices = new PostsServices(apiOptions as IApiOptions<IPost>, apiOptionsManager, apiManager);

      const user = await postsServices.getPost('1');
      expect(user.data.id).to.equal(1);
      expect(user.status).to.equal(200);
    });
  });

  describe('addPost()', () => {
    it('should successfully post user data', async() => {
      const postData = {
        'userId': 1,
        'id': 1,
        'title': 'sunt aut facere',
        'body': 'rem eveniet architecto'
      };

      const apiOptions = new ApiOptions();
      const apiOptionsManager = new ApiOptionsManager();
      const apiManager = new ApiManager();

      const postsServices = new PostsServices(apiOptions as IApiOptions<IPost>, apiOptionsManager, apiManager);
      const response = await postsServices.addPost(postData);
      expect(response.data.id).not.to.be.null;
      expect(response.status).to.equal(201);
    });
  });
});
