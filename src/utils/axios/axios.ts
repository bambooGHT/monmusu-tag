import axios from 'axios';
import type { AxiosRequestConfig, AxiosInstance, } from 'axios';
import type { AxiosInstanceType, Interceptor, SyncGet } from './type';

class Request {
  private AxiosInstance: AxiosInstance;

  constructor(config: AxiosInstanceType) {
    const AxiosInstance = axios.create(config);
    // this.lnag = config.headers!["lang"];
    this.AxiosInstance = AxiosInstance;
  }

  setInterceptors(config: Interceptor) {
    this.AxiosInstance.interceptors.request.use(
      config.reqinterceptor,
      config?.reqinterceptorErr);
    this.AxiosInstance.interceptors.response.use(
      config?.resinterceptor,
      config?.resinterceptorErr);
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.AxiosInstance.get(url, config);
    return data;
  }

  async request<T>(config: AxiosRequestConfig): Promise<T> {
    const { data } = await this.AxiosInstance.request(config);
    return data;
  }
}

export default Request;