<template>
  <section class="levels-info">
    <tabs class="details-tabs" v-model:index="currentTab" :list="Object.keys(components).slice(mediaMatch ? 0 : 1, 10)"
      :styleName="'tabs-1'">
    </tabs>
    <section class="levels-info-components family-Century">
      <component :is="components[currentTab]"></component>
    </section>
  </section>
</template>

<script setup lang="ts">
import tabs from '@/views/components/tabs';
import { components, currentTab, mediaMatch } from './quest-details';
</script>

<style lang="scss">
.levels-info {
  &-components {
    overflow-y: auto;
    box-sizing: border-box;
    padding: 0 3px;
    border: 2px solid var(--color-border);
    width: 100%;
    height: 500px;
    font-size: clamp(1.23rem, 1.5vw, 1.5rem);
    @include scroll;

    > * {
      box-sizing: border-box;
      padding: 5px 0;
    }

    .route-list-min {
      margin: 0;
      width: 45px;

      .unit-icon-img {
        height: 45px;
      }
    }

    .title {
      font-weight: bold;
      font-size: clamp(1.5rem, 1.7vw, 1.7rem);
    }
  }
}
</style>