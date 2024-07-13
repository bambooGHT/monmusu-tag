
//后传函数
const debounce = (time: number) => {
  let lastTime = 0;
  return (fn: Function) => {
    lastTime && clearTimeout(lastTime);
    lastTime = setTimeout(() => {
      fn();
    }, time);
  };
};
export { debounce };