import { expect } from 'chai';
import { ApiOptionsManager } from '../ApiOptionsManager';
import { ApiOptions } from '../../models/ApiOptions';

describe('ApiOptionsManager', () => {
  describe('createApiSimpleGetOptions()', () => {
    it('should return correct options', () => {
      // Arrange
      const apiOptionsManager = new ApiOptionsManager();
      const apiOptions = new ApiOptions();
      apiOptions.method = 'get';
      apiOptions.url = 'hello.world';
      apiOptions.headers = { 'content-type': 'application/json' };
      const expectedOutput = {
        method: 'get',
        url: 'hello.world',
        headers: { 'content-type': 'application/json' },
      };
      // Act
      const options = apiOptionsManager.createApiSimpleGetOptions(apiOptions);
      // Assert
      expect(options).to.deep.equal(expectedOutput);
    });
  });
});
