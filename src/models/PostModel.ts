export interface IGetAllPostsResponse {
  status: number;
  data: IPost[];
}

export interface IGetPostResponse {
  status: number;
  data: IPost;
}

export interface IAddPostResponse {
  status: number;
  data: IAddPost;
}

export interface IAddPost {
  id: string;
}

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
