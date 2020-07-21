import { ICallback, IEventPayload } from './models';
import { ResponseGenerator } from './services/ResponseGenerator';
import { RequestRouter } from './services/RequestRouter';
import { UsersServices } from './services/UsersServices';
import { PostsServices } from './services/PostsServices';
import { ApiOptions } from './models/ApiOptions';
import { ApiManager } from './lib/ApiManager';
import { ApiOptionsManager } from './lib/ApiOptionsManager';
import { IApiOptions } from './models';
import { IUser } from './models/UserModel';
import { IPost } from './models/PostModel';

module.exports.example = async(event: IEventPayload, context: any, callback: ICallback) => {

  const apiOptions = new ApiOptions();
  const apiOptionManager = new ApiOptionsManager();
  const apiManager = new ApiManager();
  const usersServices = new UsersServices(apiOptions as IApiOptions<IUser>, apiOptionManager, apiManager);
  const postsServices = new PostsServices(apiOptions as IApiOptions<IPost>, apiOptionManager, apiManager);
  const requestRouter = new RequestRouter(postsServices, usersServices);
  const responseGenerator = new ResponseGenerator(requestRouter);
  const response = await responseGenerator.generateLambdaResponse(event);

  callback(null, response);
};
