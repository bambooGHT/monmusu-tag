import type { ClassNames } from "../types";

export const getCarouselEffectClassNamesAndTransitionTime = (styleIndex: "1" | "2"): ClassNames => {
  return {
    main: `DCLLCarousel-${styleIndex}`,
    list: `DCLLCarousel-${styleIndex}-list`,
    nav: `DCLLCarousel-${styleIndex}-nav`,
    toggle: `DCLLCarousel-${styleIndex}-toggle`,
    center: `list-center`,
    next: `list-next`,
    prev: `list-prev`,
    curNav: `current`,
    transitionTime: 500
  };
};