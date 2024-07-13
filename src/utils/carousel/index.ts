import DCLLCarouselInit from "./carouselInit";
import { DCLLCarouseEffect } from "./effect";
import type { Options } from "./types";


const DCLLCarousel = (options: Options) => {
  const carouselData = new DCLLCarouselInit(options);
  return new DCLLCarouseEffect[options.carouselEffect](carouselData);
};

export default DCLLCarousel;