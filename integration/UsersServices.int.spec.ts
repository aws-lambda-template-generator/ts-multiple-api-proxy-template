import { expect } from 'chai';
import { ApiOptions } from '../src/models/ApiOptions';
import { ApiManager } from '../src/lib/ApiManager';
import { ApiOptionsManager } from '../src/lib/ApiOptionsManager';
import { UsersServices } from '../src/services/UsersServices';
import { IApiOptions } from '../src/models';
import { IUser } from '../src/models/UserModel';

describe('Integration test for UserServices', () => {
  describe('getAllUsers()', () => {
    it('should return output with successful get request', async() => {
      const apiOptions = new ApiOptions();
      const apiOptionsManager = new ApiOptionsManager();
      const apiManager = new ApiManager();

      const usersServices = new UsersServices(apiOptions as IApiOptions<IUser>, apiOptionsManager, apiManager);

      const users = await usersServices.getAllUsers();

      expect(users.data.length).to.be.gte(1);
      expect(users.status).to.equal(200);
    });
  });

  describe('getUser()', () => {
    it('should return output with successful get request', async() => {
      const apiOptions = new ApiOptions();
      const apiOptionsManager = new ApiOptionsManager();
      const apiManager = new ApiManager();

      const usersServices = new UsersServices(apiOptions as IApiOptions<IUser>, apiOptionsManager, apiManager);

      const user = await usersServices.getUser('1');
      expect(user.data.id).to.equal(1);
      expect(user.status).to.equal(200);
    });
  });

  describe('addUser()', () => {
    it('should successfully post user data', async() => {
      const userData = {
        id: 1000,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '100',
            lng: '100'
          }
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets'
        }
      };

      const apiOptions = new ApiOptions();
      const apiOptionsManager = new ApiOptionsManager();
      const apiManager = new ApiManager();

      const usersServices = new UsersServices(apiOptions as IApiOptions<IUser>, apiOptionsManager, apiManager);
      const response = await usersServices.addUser(userData);
      expect(response.data.id).not.to.be.null;
      expect(response.status).to.equal(201);
    });
  });
});
