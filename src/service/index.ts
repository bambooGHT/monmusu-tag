export * from "./swr";

export const Url = (url: string) => {
  if (!url) return "";
  return import.meta.env.VITE_ASSETS_URL + url;
};