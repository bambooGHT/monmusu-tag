import type { CanvasSize, Coordinates } from "./types";

type DrawIconsToURLParams = {
  key: string | number;
  size: CanvasSize;
  iconUrls: string[];
  coordinates: Coordinates;
};

type DrawIconsToURL = {
  (data: DrawIconsToURLParams): Promise<string>;
};

const urlCache = new Map<string | number, { url?: string, promise?: Promise<string>; }>();

export const drawIconsToURL: DrawIconsToURL = async ({ key, size, iconUrls, coordinates }) => {
  const _key = key + iconUrls[0];
  const data = urlCache.get(_key) || { url: undefined, promise: undefined };
  urlCache.set(_key, data);

  if (data.url) return data.url;
  if (!data.promise) {
    const promise = async () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext('2d')!;
      canvas.width = size[0];
      canvas.height = size[1];

      const images = await Promise.all(iconUrls.map(async (url) => {
        const image = await loadimg(url);
        return image;
      }));

      images.forEach((image, index) => {
        (<any>context).drawImage(image, ...coordinates[index]);
      });
      const blob = await new Promise<Blob>(res => canvas.toBlob((b) => res(b!)));
      const url = URL.createObjectURL(blob!);
      data.url = url;

      return url;
    };

    data.promise = promise().finally(() => {
      data.promise = undefined;
    });
  }

  return data.promise;
};


const loadimg = (url: string) => {
  return new Promise<HTMLImageElement>((res) => {
    const image = new Image();
    image.setAttribute("crossOrigin", '*');
    image.onload = function () {
      res(image);
    };
    image.src = url;
  });
};