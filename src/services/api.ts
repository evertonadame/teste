import axios, { AxiosError, AxiosInstance } from 'axios';
import Router from 'next/router';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { User } from 'types/AuthModels';
import { AuthTokenError } from './errors/AuthTokenError';

let isRefreshing = false;
let failedRequestsQueue:any = [];

export function setupAPIClient(ctx = undefined): AxiosInstance {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'https://vn4l8nyh18.execute-api.sa-east-1.amazonaws.com/prod/',
    headers: {
      authorization: cookies['uberPlantao.token'],
    },
  });

  api.interceptors.response.use((response) => response, (error: AxiosError) => {
    if (error.response?.status === 403) {
      cookies = parseCookies(ctx);

      const {
        'uberPlantao.refreshToken': refreshToken,
        'uberPlantao.user': savedUser,
      } = cookies;

      const parsedUser = JSON.parse(savedUser) as User;

      const originalConfig = error.config;

      if (!isRefreshing) {
        isRefreshing = true;

        api.post('/login/newtoken', {
          user_id: parsedUser.userId,
          refresh_token: refreshToken,
        }).then((response) => {
          const { token } = response.data.auth;

          setCookie(ctx, 'uberPlantao.token', token, {
            maxAge: 60 * 60 * 3, // 3 hours
            path: '/',
          });
          setCookie(ctx, 'uberPlantao.refreshToken', response.data.auth.refresh_token, {
            maxAge: 60 * 60 * 3, // 3 hours
            path: '/',
          });

          failedRequestsQueue.forEach((request:any) => request.onSuccess(token));
          failedRequestsQueue = [];
        }).catch((err) => {
          failedRequestsQueue.forEach((request:any) => request.onFailure(err));
          failedRequestsQueue = [];
          if (process.browser) {
            destroyCookie(undefined, 'uberPlantao.user');
            destroyCookie(undefined, 'uberPlantao.token');
            destroyCookie(undefined, 'uberPlantao.refreshToken');

            Router.push('/');
          } else {
            Promise.reject(new AuthTokenError());
          }
        }).finally(() => {
          isRefreshing = false;
        });
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          onSuccess: (token:string) => {
            originalConfig.headers.authorization = token;
            resolve(api(originalConfig));
          },
          onFailure: (err: AxiosError) => {
            reject(err);
          },
        });
      });
    }
    // if (process.browser) {
    //   destroyCookie(undefined, 'uberPlantao.user');
    //   destroyCookie(undefined, 'uberPlantao.token');
    //   destroyCookie(undefined, 'uberPlantao.refreshToken');

    //   Router.push('/');
    // } else {
    //   Promise.reject(new AuthTokenError());
    // }

    return Promise.reject(error);
  });

  return api;
}
