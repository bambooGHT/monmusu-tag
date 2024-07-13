<template>
  <ul class="quest-rewardtable2" ref="DOM">
    <li v-for="item of data">
      <slot :item="item"></slot>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const { data } = defineProps<{ data: any[]; }>();
const DOM = ref();
defineExpose({ DOM });
</script>

<style lang="scss">
@import "./quest-rewards2.scss";
</style>