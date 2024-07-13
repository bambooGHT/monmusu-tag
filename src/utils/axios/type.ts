import type { AxiosRequestConfig, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export interface Interceptor<T = any, U = any> {
  reqinterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig;
  reqinterceptorErr?: (error: AxiosError<U>) => void;
  resinterceptor(config: AxiosResponse): AxiosResponse;
  resinterceptorErr?: (error: AxiosError<T>) => void;
};

export type AxiosInstanceType = AxiosRequestConfig;
export type SyncGet = <T>(url: string, config?: Object) => T;