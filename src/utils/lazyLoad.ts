type TargetElement = HTMLElement | HTMLElement[];
type Func = () => Promise<string> | string;
type TargetImageSources = Func | string | Func[] | string[];
type ObserverOptions = {
  root?: Element | HTMLElement;
  /** 触发阈值 0.0-1 */
  threshold?: number;
};
/**
 * 监听图片
 * @param target - 目标元素
 * @param imageSources
 * @param options
 */
const observePic = (target: TargetElement, imageSources?: TargetImageSources, options?: ObserverOptions) => {
  const { root, threshold = 0.1 } = options || {};
  target = Array.isArray(target) ? target : [target];
  
  let isString = true, targetMap: Map<Element, any> | undefined = undefined;
  if (imageSources) {
    imageSources = Array.isArray(imageSources) ? imageSources : [imageSources] as any;
    isString = typeof (<any>imageSources)[0] === "string";
    targetMap = new Map();
  }

  const observer = new IntersectionObserver(async (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        const img = (<HTMLImageElement | HTMLSourceElement>e.target);
        observer.unobserve(img);

        let sources;
        if (targetMap) {
          sources = targetMap.get(img);
          targetMap.delete(img);
        } else {
          sources = img.dataset.src;
        }

        img[img.tagName === "SOURCE" ? "srcset" : "src"] = isString ? sources : await sources();
      }
    }
  },
    { root, threshold: [threshold], rootMargin: "100px 0px 100px 0px" }
  );

  target.forEach((p, index) => {
    observer.observe(p);
    targetMap?.set(p, (<any>imageSources)[index]);
  });

  const stop = () => {
    observer.disconnect();
  };
  return stop;
};

// const observerDOM = new IntersectionObserver(async (entries, obs) => {
//   for (const e of entries) {
//     if (e.isIntersecting) {

//     }
//   }
// }, options);


const lazyload = { observePic };

export default lazyload;