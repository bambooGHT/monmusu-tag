<template>
  <section class="unit-page">
    <unitSpine></unitSpine>
    <tabs class="family-Orbitron" :list="tabNames.slice(0, mediaMatch ? 4 : 2)" v-model:index="currentTab"></tabs>
    <section class="unit-detail">
      <component v-if="loading" :is="template[currentTab]"></component>
      <component v-else :is="conmponents[currentTab]"></component>
    </section>
  </section>
</template>

<script setup lang="ts">
import unitSpine from './spine';
import tabs from '@/views/components/tabs';
import { init, mediaMatch, tabNames, currentTab, conmponents, loading, reset } from './unit';
import unitinfoSkeleton from './info/unit-info-skeleton.vue';
import abilitiesSkeleton from './abilities/unit-abilities-skeleton.vue';
import { onBeforeUnmount } from 'vue';

const template: ObjIndex<any> = {
  "info": unitinfoSkeleton,
  "abilities": abilitiesSkeleton
};

init();
onBeforeUnmount(() => {
  reset();
});
</script>

<style lang="scss" scoped>
.unit-page {
  display: flex;
  flex-wrap: wrap;
  margin: 5px 3px;
  height: 100%;
}

.unit-detail {
  margin-top: 3px;
  border: 2px solid var(--color-border);
  width: 100%;
  min-height: 350px;
  cursor: default;
  font-size: clamp(1.25rem, 1.3vw, 1.45rem);

  > * {
    box-sizing: border-box;
    padding: 5px 0;
    max-height: clamp(553px, 56.9vw, 597px);
    @media (width <=860px) {
      max-height: 490px;
    }
  }
}
</style>