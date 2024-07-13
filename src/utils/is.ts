/**
 * 判断值是否为对象
 */
function isObject(data: any) {
  return String(Object.prototype.toString.call(data)).slice(8, -1) === "Object";
}
/**
 * 判断是不是对象类型
 */
window.isObjectType = function <T extends unknown>(data: unknown): data is T {
  return isObject(data);
};

window.isNumber = function (data: unknown): data is number {
  return typeof data === "number";
};


window.isString = function (data: unknown): data is string {
  return typeof data === "string";
};