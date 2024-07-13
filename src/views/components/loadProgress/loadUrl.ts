import { Url } from "@/service";
import { useSWRAsync } from "@/service";
import { throttle } from "@/utils/throttle";
import { reactive } from "vue";

export const loadUrl = (url: string, callBack: (value: string) => void) => {
  const load = reactive({
    is: true,
    progressValue: 0
  });
  useSWRAsync("imgProgressUrl", false, Url(url), throttle((pro) => {
    load.progressValue = pro.loaded / pro.total! * 100;

  }, 500)).then(callBack).finally(() => {
    setTimeout(() => {
      load.progressValue = 100;
      setTimeout(() => {
        load.is = false;
      }, 100);
    }, 100);
  });

  return load;
};