import { ResponseGenerator } from '../ResponseGenerator';
import { RequestRouter } from '../RequestRouter';
import { UsersServices } from '../UsersServices';
import { PostsServices } from '../PostsServices';
import { IUser } from '../../models/UserModel';
import { IPost } from '../../models/PostModel';
import { IApiOptions } from '../../models';
import { ApiOptions } from '../../models/ApiOptions';
import { ApiOptionsManager } from '../../lib/ApiOptionsManager';
import { ApiManager, IApiManager } from '../../lib/ApiManager';
import sinon from 'sinon';
import { apiGatewayEventMock } from './test-data/apiGatewayEventMock';
import { expect } from 'chai';
import { RESPONSE_HEADER } from '../../constants';

describe('ResponseGenerator', () => {
  beforeEach(() => {
    sinon.stub(console, 'log');
  });

  afterEach(() => {
    (console.log as any).restore();
  });

  describe('generateLambdaResponse()', () => {
    it('should generate correct lambda response', async () => {
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
      const responseGenerator = new ResponseGenerator(requestRouter);
      const mockData = { id: 1 };
      sinon.stub(RequestRouter.prototype, 'routeRequests').resolves({ status: 200, data: mockData });
      const expectedResponse = {
        statusCode: 200,
        headers: RESPONSE_HEADER,
        body: JSON.stringify(mockData),
        isBase64Encoded: false,
      };
      // act
      const lambdaResponse = await responseGenerator.generateLambdaResponse(apiGatewayEventMock as any);
      // assert
      expect(lambdaResponse).to.deep.equal(expectedResponse);

      (RequestRouter.prototype.routeRequests as any).restore();
    });
  });
});
