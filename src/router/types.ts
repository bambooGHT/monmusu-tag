import type { RouteLocationNormalized } from "vue-router";

export type JumpFunc = (to:RouteLocationNormalized,from:RouteLocationNormalized)=>any