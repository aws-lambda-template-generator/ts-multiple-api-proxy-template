import { expect } from 'chai';
import { Helpers } from '../Helpers';

describe('Helpers', () => {
  describe('getUrlParameter()', () => {
    it('should get id from url path', () => {
      const id = Helpers.getUrlParameter('/get-user/1');
      expect(id).to.equal('1');
    });
  });
});