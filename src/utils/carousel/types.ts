import type { DCLLNode } from "@/utils/linkedList/types";

export type El = HTMLElement;
export type NodeType = { node: El, nav?: El; };
export type CarouselNode = DCLLNode<NodeType>;

export type Options = {
  /** 节点 */
  el: {
    main: string;
    list: string;
    nav?: {
      list: string;
      next?: string;
      prev?: string;
    };
  };
  autoPlay?: {
    /** 自动播放间隔ms `default: 2500ms` */
    autoInterval?: number;
  };
  /** 是否循环 `default: true` */
  loop?: boolean;
  /** 可滑动 `default: false` */
  slide?: boolean;
  carouselEffect: "1" | "2";
};

export type ClassNames = {
  main: string;
  list: string;
  nav: string;
  toggle: string;
  center: string;
  next: string;
  prev: string;
  curNav: string;
  transitionTime: number;
};

export type CarouselEls = {
  main: El;
  listMainNode: El;
  list: El[],
  navList: El[] | null;
  next: El | null,
  prev: El | null;
};