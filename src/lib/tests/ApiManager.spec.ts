import { expect } from 'chai';
import { AxiosRequestConfig } from 'axios';
import { ApiManager } from '../ApiManager';
import nock from 'nock';

describe('ApiManager', () => {
  describe('makeRequest()', () => {
    it('should make api return correct response', async() => {
      // Arrange
      nock('http://hello.world')
        .get('/get-users')
        .reply(200, 'hello world');

      const apiOptions = {
        method: 'get',
        url: 'http://hello.world/get-users'
      };
      const apiManager = new ApiManager();

      // Act
      const response = await apiManager.makeRequest(apiOptions as AxiosRequestConfig);

      // Assert
      expect(response.status).to.equal(200);
      expect(response.data).to.equal('hello world');
    });

    it('should make api return error response', async() => {
      // Arrange
      nock('http://hello.world')
        .get('/get-user')
        .reply(400, 'hello error');

      const apiOptions = {
        method: 'get',
        url: 'http://hello.world/get-user'
      };
      const apiManager = new ApiManager();
      try {
        const response = await apiManager.makeRequest(apiOptions as AxiosRequestConfig);
      } catch(e) {
        expect(e.toString()).to.includes('400');
      }
    });
  });
});