<template>
  <Transition name="progress">
    <svg v-if="load.is" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <circle stroke="hsl(187, 100%, 82%)" :stroke-dasharray="`${load.progressValue} 100`" r="25%" cx="50%" cy="50%"
        class="load">
      </circle>
    </svg>
  </Transition>
</template>

<script setup lang="ts">
import { loadUrl } from './loadUrl';

const { url, fn } = defineProps<{ url: string; fn: (value: string) => void; }>();
const load = loadUrl(url, fn);
</script>

<style lang="scss" scoped>
@import "./loadProgress.scss";
</style>