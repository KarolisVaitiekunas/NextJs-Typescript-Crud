export interface IUser {
  status: boolean;
  name: string;
}

export interface IAuthBody {
  username?: string;
  email: string;
  password: string;
}

export interface IPost {
  title: string;
  body: string;
  postId?: string;
  postedBy?: {
    posts: Array<IPost>;
    // _id: string;
    username: string;
    email: string;
  };
}

export interface IResponse {
  success: boolean;
  message?: any;
  data?: any;
}

export interface IResponseGetPosts {
  success: boolean;
  message: any;
  data?: IPost[];
}

export interface IResponseCreatePost {
  success: boolean;
  message: string;
}

export interface IResponseRegister {
  success: boolean;
  message: string;
}

export interface IResponseLogin {
  success: boolean;
  message: string;
}

export interface IResponseForgotPassword {
  success: boolean;
  message: string;
}

export interface IResponseResetPassword {
  success: boolean;
  message: string;
}

export interface IResponseLoggedIn {
  success: boolean;
  message: any;
  data: any;
}

export interface IResponseLogOut {
  success: boolean;
  message: string;
}
