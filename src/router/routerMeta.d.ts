import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    /** 单独显示 */
    aloneShow?: boolean;
    /** 是否缓存 */
    isKeep?: boolean;
    /** 不缓存滚动 */
    scroll?: boolean;
    /** 页面标题 */
    pageTitle: string;
  }
}