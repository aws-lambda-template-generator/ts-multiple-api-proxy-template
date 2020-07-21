import { ILambdaResponse, IEventPayload } from '../models';
import { IRequestRouter } from '../services/RequestRouter';
import { RESPONSE_HEADER } from '../constants';

export class ResponseGenerator {

  private readonly _requestRouter;

  constructor(requestRouter: IRequestRouter){
    this._requestRouter = requestRouter;
  }

  async generateLambdaResponse(event: IEventPayload): Promise<ILambdaResponse> {

    const data = await this._requestRouter.routeRequests(event);
    console.log('checking data in generateLambdaResponse(): ', data);
    return {
      statusCode: data.status,
      headers: RESPONSE_HEADER,
      body: JSON.stringify(data.data),
      isBase64Encoded: false
    };
  }
}