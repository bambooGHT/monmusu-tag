import { Ref, ref } from "vue";
import { fetchers, fetchers2 } from "./fetchers";
import type { Key, Key2 } from "./fetchers";

type ReturnPromise<T> = T extends Promise<infer R> ? R : T;
type SWRReturnType<T, V> = V extends string ? T extends Record<string, any> ? T[V] : T : T;
type fetcherReturn<T extends FunctionType> = ReturnPromise<ReturnType<T>>;
type FunctionType = (...args: any[]) => Promise<any>;

const cache = new Map<string, { value?: any, promise?: Promise<any>; }>();


export const useSWRAsync = async <T extends Key, U extends Parameters<fetchers[T]>, K extends fetcherReturn<fetchers[T]>>
  (key: T, isCache: boolean = true, ...params: U)
  : Promise<Unfold<SWRReturnType<K, U[0]>>> => {

  const id = key + paramToStr(params[0]);
  const data = cache.get(id) || { value: undefined, promise: undefined };
  cache.set(id, data);

  if (data.value) return data.value;
  if (!data.promise) {
    const promise = async () => {
      const res = await (<FunctionType>fetchers[key])(...params);
      data.value = res;
      return res;
    };
    data.promise = promise().finally(() => {
      data.promise = undefined;
      if (!isCache) cache.delete(id);
    });
  }

  return data.promise;
};

export const useSWR = <T extends Key2, S extends Parameters<fetchers2[T]>, K extends fetcherReturn<fetchers2[T]>>
  (key: T, isCache: boolean = true, ...params: S)
  : Ref<Unfold<SWRReturnType<K, S[0]>>> => {

  const id = key + paramToStr((params as any)[0]);
  const data = cache.get(id) || { value: ref(undefined), promise: undefined };
  cache.set(id, data);

  if (data.value.value) return data.value;
  if (!data.promise) {
    const promise = async () => {
      const res = await (<FunctionType>fetchers2[key])(...params);
      data.value.value = res;
      return data.value;
    };

    data.promise = promise().finally(() => {
      data.promise = undefined;
      if (!isCache) cache.delete(id);
    });
  }

  return data.value;
};

const paramToStr = (param: any): string => {
  return isObjectType(param) ? JSON.stringify(param) : (param ?? "");
};
