import type { ICanvas, IRenderer } from "pixi.js";
import Resize from "@/utils/resize";
import MediaQueryHandler from "@/utils/mediaQueryHandler";
import { onMounted, ref, onBeforeUnmount } from "vue";

export type MediaQueryOptions = {
  value: string;
  callback?: ((match: boolean) => void)[];
};

export const render = (mediaQueryOptions: MediaQueryOptions, renderer: IRenderer<ICanvas>) => {
  document.body.classList.toggle("hide-scroll", true);
  const canvasBox = ref<HTMLElement>();
  const height = ref<string>();
  const withMaxWidth = ref(false);
  const mediaQuery = new MediaQueryHandler(mediaQueryOptions.value, (e) => {
    withMaxWidth.value = e.matches ? true : false;
    mediaQueryOptions.callback && mediaQueryOptions.callback.forEach(p => p(e.matches));
  });
  let resize: Resize;

  onMounted(async () => {
    const canvas = canvasBox.value!;
    // 监听窗口变化
    resize = new Resize(canvas, (re) => {
      const { contentRect } = re;
      
      renderer.view.style!.width = `${contentRect.width}px`;
      height.value = `${contentRect.height}px`;
    });

    renderer.view.style!.width = `${canvas.clientWidth}px`;
    canvas.appendChild(<HTMLCanvasElement>renderer.view);
  });

  onBeforeUnmount(() => {
    document.body.classList.toggle("hide-scroll", false);
    mediaQuery.remove();
    resize?.remove();
  });

  return { canvasBox, height, withMaxWidth };
};