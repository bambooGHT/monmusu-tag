<template>
  <div class="icons" v-bind="$attrs">
    <div class="unit-icon-img icon-img" :key="id" :class="cls" v-bind="txt" tabindex="-1">
      <img decoding="async" :ref="el => el && lazyload.observePic(el as HTMLImageElement, fn)">
    </div>
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<script setup lang="ts">
import type { PropsData, PropData2 } from "./types";
import lazyload from '@/utils/lazyLoad';
import { getUrl } from './icons';

const { rarity, id, text, iconKey, seat } = defineProps<PropsData & PropData2>();

const cls = text ? ["text-tip", `text-tip-${seat || "top"}`] : '';
const txt = text ? {
  "data-txt": text
} : undefined;

const fn = async () => {
  return await getUrl(id, iconKey, rarity);
};
</script>

<style lang="scss" scoped>
@import "../unitFace/unitFace.scss";
@import "./propComponent.scss";
</style>