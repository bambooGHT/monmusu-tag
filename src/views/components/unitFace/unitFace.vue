<template>
  <div :key="id" class="unit-icon" :class="{ 'unit-icon-enemy': category === 'enemy' }">
    <a :href="id ? `/unit/${getPath(id, category)}` : undefined" @click="toUnit($event, id, category)"
      class="unit-icon-img">
      <img :ref="el => el && lazyload.observePic(el as HTMLImageElement, fn)">
    </a>
    <slot></slot>
  </div>
</template>

<script setup lang="ts" generic="T extends unitType">
import type { unitType } from './iconIndex';
import { getUrl } from './iconIndex';
import lazyload from '@/utils/lazyLoad';
import { getPath, toUnit } from "./toUnit";

const data = withDefaults(defineProps<unitType>(), {
  category: "character",
  rarity: 82,
});

const fn = async () => {
  return await getUrl(data as unitType);
};
</script>

<style lang="scss" scoped>
@import "./unitFace.scss";
</style>