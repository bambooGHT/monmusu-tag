import type { InternalAxiosRequestConfig } from "axios";

type url = string;

export default class cancelDupReq {
  pendingReq: Map<url, AbortController> = new Map();

  setReq(config: InternalAxiosRequestConfig) {
    const controller = new AbortController();
    config.signal = controller.signal;
    this.pendingReq.set(config.url!, controller);
  }

  cancelReq(key: url): void {
    this.pendingReq.get(key)?.abort();
  }
  
  removeReq(key: url): void {
    this.pendingReq.delete(key);
  }
}