<template>
  <section class="canvasRender" :style="{ height }">
    <section class="canvasRender-left">
      <slot name="left"></slot>
      <div class="canvas-box" ref="canvasBox"></div>
    </section>
    <section class="canvasRender-right" v-if="!withMaxWidth" :style="{ 'max-width': rightMaxWidth, width: rightWidth }">
      <slot name="right"></slot>
    </section>
  </section>
</template>

<script setup lang="ts">
import type { ICanvas, IRenderer } from "pixi.js";
import { render } from "./canvasRender";
import type { MediaQueryOptions } from "./canvasRender";

const { renderer, rightMaxWidth, rightWidth, mediaQueryOptions } = defineProps<{
  renderer: IRenderer<ICanvas>;
  rightMaxWidth: string;
  rightWidth: string;
  mediaQueryOptions: MediaQueryOptions;
}>();

const { canvasBox, height, withMaxWidth } = render(mediaQueryOptions, renderer);
</script>

<style lang="scss" scoped>
@import "./canvasRender.css";
</style>