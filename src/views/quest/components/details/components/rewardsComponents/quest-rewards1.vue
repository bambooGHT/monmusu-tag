<template>
  <ul class="quest-rewardtable">
    <li v-for="(p, index) of data" :key="`${p.id}${index}`">
      <propComponent :id="p.id" :icon-key="p.iconKey" :rarity="p.rarity"
        v-bind="isShowText ? { 'text': p.text, 'seat': 'bottom' } : { 'onclick': () => showInfo(p) }">
      </propComponent>
      <div>{{ p.name }}</div>
      <slot :item="p" :index="index">
      </slot>
    </li>
    <i></i>
    <i></i>
    <i></i>
  </ul>
</template>

<script setup lang="ts">
import propComponent from "@/views/components/propComponent";
import type { ItemValue } from "@/data";
import { showPropInfo } from "@/views/components/propInfoPopup";

const { data, isShowText } = defineProps<{ data: ItemValue[]; isShowText?: boolean; }>();
const showInfo = (value: ItemValue) => {
  showPropInfo(value);
};
</script>

<style lang="scss">
@import "./quest-rewards1.scss";
</style>