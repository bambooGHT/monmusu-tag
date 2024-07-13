import { message } from "@/message";
import Request from "@/utils/axios";
import qs from 'qs';

export const service = new Request({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { indices: false });
  }
});

service.setInterceptors({
  "reqinterceptor": (req) => {
    // cancelreq.setReq(req);
    // req.headers["lang"] = lang;
    return req;
  },

  "resinterceptor": (res) => {
    // cancelreq.removeReq(res.config.url!);
    return res;
  },

  reqinterceptorErr(err) {
    console.error(err);
  },

  resinterceptorErr(err) {
    if (err.message.includes("30000ms")) message.add({ type: "error", message: "请求超时", duration: 3000 });
    else if ([404, 429, 500].includes(err.response?.status || err.response?.data?.code || 0)) {
      const data = err.response!.data;
      message.add({ type: "error", message: data.message || data, duration: 3000 });
    }
    console.error(err);
  }
});