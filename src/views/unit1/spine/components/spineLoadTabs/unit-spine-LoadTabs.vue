<template>
  <ul class="unit-spine-tabs" :style="{ color: currentBackground ? '#ffffffce' : '#000000' }">
    <li v-for="(p, key) in data.spineResource" @click="monmusuSpine.load(p!, key)" :key="p?.src">
      <clickButton :selected="data.currentSpineType === key" class="unit-spine-tabs-list">
        {{ key }}
      </clickButton>
    </li>
  </ul>
  <div :class="{ 'load-progress-show': loadProgress.progress !== 100 }" class="unit-spine-load-progress backdrop-filter"
    :style="{ 'background-size': `${loadProgress?.progress}%` }">
    <span>{{ `${loadProgress?.text}` }}</span>
  </div>
</template>

<script setup lang="ts">
import { monmusuSpine } from '@/store/unit1/unitData';
import { clickButton } from '@/views/components';
import { currentBackground } from '../../unit-spine';
import { computed } from 'vue';

const { data } = monmusuSpine;
const loadProgress = computed(() => {
  const resourceCount = data.spineResource[data.currentSpineType!]?.resourceCount;
  if (!resourceCount) return {
    progress: 100
  };
  return {
    progress: data.spineLoadedCount / (resourceCount || 1) * 100,
    text: `${data.spineLoadedCount} / ${resourceCount || 0}`
  };
});
</script>

<style lang="scss" scoped>
@import "./unit-spine-LoadTabs.scss";
</style>