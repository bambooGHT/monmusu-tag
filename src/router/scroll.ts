import title, { updatePageMeta } from "./title";
import type { JumpFunc } from "./types";

const scrollPositions: Record<string, { y: number; }> = {};

export const saveScroll: JumpFunc = (to, from) => {
  if (!document.title.includes(to.meta.pageTitle)) {
    updatePageMeta(to.meta.pageTitle);
  }
  if (from.meta.noScroll) return;
  const key = from.name as string;

  if (key) {
    if ((to.name !== key && from.meta.scroll) || (to.name === key && !to.meta.scroll && !Object.keys(to.query).length)) {
      scrollPositions[key] = { y: 0 };
    } else {
      scrollPositions[key] = { y: document.documentElement.scrollTop || document.body.scrollTop };
    }
  }
};

export const loadScroll: JumpFunc = async (to) => {
  return new Promise((res) => {
    const value = scrollPositions[to.name as string];
    title.value = (<string>to.meta.title)?.toUpperCase() || (<string>to.name)?.toUpperCase();
    document.documentElement.scrollTop = value?.y || 0;
    res("ok");
  });
};