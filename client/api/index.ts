import fetch from 'isomorphic-fetch';
import {
  IResponse,
  IAuthBody,
  IPost,
  IResponseRegister,
  IResponseLogin,
  IResponseCreatePost,
  IResponseGetPosts,
  IResponseForgotPassword,
  IResponseResetPassword,
  IResponseLogOut,
  IResponseLoggedIn,
} from '../interfaces';

const host = process.env.NEXT_PUBLIC_API_HOST;
console.log('the thing', host);

export const register = async (data: IAuthBody): Promise<IResponseRegister> => {
  const response = await fetch(`http://${host}:3001/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const _data = await response.json();
  return _data;
};

export const login = async (data: IAuthBody): Promise<IResponseLogin> => {
  const response = await fetch(`http://${host}:3001/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const _data = await response.json();
  return _data;
};

export const createPost = async (data: IPost): Promise<IResponseCreatePost> => {
  const response = await fetch(`http://${host}:3001/post/create`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const _data = await response.json();
  return _data;
};

export const getPosts = async (cookies: string | undefined): Promise<IResponseGetPosts> => {
  const response = await fetch(`http://${host}:3001/post/getPosts`, {
    method: 'GET',
    credentials: 'include',
    headers: cookies ? { cookie: cookies } : undefined,
  });
  const _data = await response.json();
  return _data;
};

export const deletePost = async (title: string) => {
  const response = await fetch(`http://${host}:3001/post/delete/${title}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  const _data = await response.json();
  return _data;
};

export const updatePost = async (data: IPost, postId: string | string[]) => {
  const response = await fetch(`http://${host}:3001/post/update/${postId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const _data = await response.json();
  return _data;
};

export const forgotPassword = async (data: { email: string }): Promise<IResponseForgotPassword> => {
  const response = await fetch(`http://${host}:3001/auth/forgotpassword`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const _data = await response.json();
  return _data;
};

export const resetPassword = async (data: { password: string; resetToken: string | string[] }): Promise<IResponseResetPassword> => {
  const response = await fetch(`http://${host}:3001/auth/resetpassword/${data.resetToken}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const _data = await response.json();
  return _data;
};

export const getLoggedIn = async (): Promise<IResponseLoggedIn> => {
  console.log(location.hostname);
  const response = await fetch(`http://${host}:3001/auth/loggedIn`, {
    method: 'GET',
    credentials: 'include',
  });
  const _data = await response.json();
  return _data;
};

export const logout = async (): Promise<IResponseLogOut> => {
  const response = await fetch(`http://${host}:3001/auth/logout`, {
    method: 'GET',
    credentials: 'include',
  });
  const _data = await response.json();
  return _data;
};
