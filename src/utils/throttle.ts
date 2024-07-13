
export const throttle = <T extends (...args: any) => any>(fn: T, time: number) => {
  let lastTime = 0;
  return (...args: Parameters<T>) => {
    const currentTime = new Date().getTime();
    if ((currentTime - lastTime) > time) {
      fn(...args as any);
      lastTime = currentTime;
    };
  };
};

/** 后传函数 */
export const throttle1 = (time: number) => {
  let lastTime = 0;
  return (fn: Function) => {
    const currentTime = new Date().getTime();
    if ((currentTime - lastTime) > time) {
      fn();
      lastTime = currentTime;
    };
  };
};
/** 后传函数后调用 */
export const throttle2 = (time: number) => {
  let lastTime = 0;
  return <T extends (...args: any) => any>(fn: T) => {
    return (...args: Parameters<T>) => {
      const currentTime = new Date().getTime();
      if ((currentTime - lastTime) > time) {
        fn(...args as any);
        lastTime = currentTime;
      };
    };
  };
};