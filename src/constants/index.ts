export const BASE_URL = 'https://jsonplaceholder.typicode.com';
export const USER_URL = `${BASE_URL}/users`;
export const POSTS_URL = `${BASE_URL}/posts`;

export const GET = 'get';
export const POST = 'post';
export const PUT = 'put';
export const PATCH = 'patch';
export const DELETE = 'delete';

export const BASIC_CONTENT_TYPE_ONLY_HEADERS = {
  'content-type': 'application/json; charset=UTF-8"'
};

// Lambda path
export const GET_USERS = 'get-users';
export const GET_USER = 'get-user';
export const GET_POSTS = 'get-posts';
export const GET_POST = 'get-post';

// Lambda Response
export const RESPONSE_HEADER = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};