<template>
  <ul class="associationId" v-if="unitDetailData.associationIds">
    <li @click="toUnit(p)" :class="{ current: unitDetailData.unit.id === p }"
      v-for="p of unitDetailData.associationIds">
      {{ p }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { unitDetailData } from '@/store/unit1/unitData';
import router from '@/router';

const toUnit = (id: number) => {
  if (unitDetailData.unit.id === id) return;
  router.replace(`unit`, id);
};
</script>

<style lang="scss" scoped>
.associationId {
  display: flex;

  li {
    box-sizing: border-box;
    margin: 5px;
    border-bottom: 2px solid var(--color-border);
    width: calc(33.33% - 10px);
    height: 30px;
    cursor: pointer;
    line-height: 30px;
    text-align: center;
  }

  li:hover,
  .current {
    color: var(--text-color-selected);
  }
}
</style>