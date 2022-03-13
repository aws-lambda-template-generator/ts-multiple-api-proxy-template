import { APIGatewayProxyEvent, APIGatewayProxyResult, Callback, Context } from 'aws-lambda';
import { ResponseGenerator } from './services/ResponseGenerator';
import { RequestRouter } from './services/RequestRouter';
import { UsersServices } from './services/UsersServices';
import { PostsServices } from './services/PostsServices';
import { ApiOptions } from './models/ApiOptions';
import { ApiManager, IApiManager } from './lib/ApiManager';
import { ApiOptionsManager } from './lib/ApiOptionsManager';
import { IApiOptions } from './models';
import { IUser } from './models/UserModel';
import { IPost } from './models/PostModel';

module.exports.example = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<APIGatewayProxyResult>,
) => {
  console.log(event);
  console.log('API Gateway Event.');
  console.log(`payload: ${event.body}`);
  console.log(`method: ${event.httpMethod}`);
  console.log(`paths: ${event.path}`);

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
  const response = await responseGenerator.generateLambdaResponse(event);

  console.log('checking lambda response in handler: ', response);

  callback(null, response);
};
