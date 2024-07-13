import { createRouter, createWebHistory, type RouteParamsRaw } from "vue-router";
import routes from "./routes";
import { loadScroll, saveScroll } from "./scroll";
import type { JumpFunc } from "./types";

const Router = createRouter({
  history: createWebHistory(),
  routes,
});
const beforeEach = [saveScroll];
const afterEach = [loadScroll];

Router.beforeEach((to, from) => {
  beforeEach.forEach(p => p(to, from));
});

Router.afterEach((to, from) => {
  afterEach.forEach(p => p(to, from));
});

type RouterQuery = {
  "unitList": { category?: UNIT.UnitType; };
  "quest": { levelId: string | number; };
  "questCategory": { list?: UNIT.UnitType; },
  search: { skill?: string, raceFeature?: string; };
};

type Routes = Record<"story" | "gallery" | "home" | "attach" | "AboutThisSite" | "unit", ObjIndex> & RouterQuery;

interface RouterJumpFunction {
  <T extends keyof Routes>(route: T, value?: string | number | Routes[T], query?: Routes[T]): void;
};

type Router = {
  replace: RouterJumpFunction;
  push: RouterJumpFunction;
  getCurrentQuery: <T extends keyof RouterQuery>(type: T) => RouterQuery[T];
  currentParamId: string;
  addBeforeEach: (func: JumpFunc) => void;
  addAfterEach: (func: JumpFunc) => void;
};
const getFn = (key: "replace" | "push"): RouterJumpFunction => {
  return (route: any, value: string | any, query: any) => {
    const params: RouteParamsRaw | undefined = value ? typeof value === "object" ?
      (query = value, undefined) : value : undefined;
    Router[key]({
      path: `/${route}${params ? `/${params}` : ""}`,
      query
    });
  };
};

const router: Router = {
  replace: getFn("replace"),
  push: getFn("push"),
  getCurrentQuery() {
    return Router.currentRoute.value.query as any;
  },
  get currentParamId() {
    return Router.currentRoute.value.params.id as string;
  },
  addBeforeEach(func) {
    beforeEach.push(func);
  },
  addAfterEach(func) {
    beforeEach.push(func);
  }
};

export { Router };
export default router;
