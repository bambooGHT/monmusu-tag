<template>
  <tabs v-model:index="currentComp" :list="Object.keys(components)"></tabs>
  <component :is="components[currentComp]"></component>
</template>

<script setup lang="ts">
import tabs from '@/views/components/tabs';
import byEnemy from './components/byEnemy';
import byRoute from './components/byRoute';
import { ref } from 'vue';

const components = { "by route": byRoute, "by enemy": byEnemy };
const currentComp = ref<keyof typeof components>("by route");
</script>

<style lang="scss" scoped>
:deep(.level-route-count) {
  font-size: 1.25rem;
  color: var(--text-color-selected-2);
  white-space: pre-wrap;
}

:deep(.level-route-draw) {
  margin: 0 5px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: var(--color-bg-btn);
  cursor: pointer;
  user-select: none;
  line-height: 35px;
  text-align: center;
  font-size: 1.2rem;
  transition: 0.2s;

  &:hover,
  &:active {
    background-color: var(--color-bg-hover-2);
  }
}
</style>