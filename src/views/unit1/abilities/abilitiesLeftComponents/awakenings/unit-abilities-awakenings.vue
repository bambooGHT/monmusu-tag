<template>
  <ul class="unit-awakening">
    <li>
      <clickButton @click="toAwakened" class="text-title family-Roboto" :width="'min-content'" :selected="awakened">
        apply
      </clickButton>
    </li>
    <li v-for="(p, index) of unitAbilitiesData.awakenings">
      <span>awakeningAbility{{ index + 1 }}</span>
      <span>{{ p }}</span>
    </li>
    <li class="text-title family-Roboto">fullAwakened</li>
    <li>{{ unitDetailData.tribe.awakedBonusText }}</li>
  </ul>
</template>

<script setup lang="ts">
import { clickButton } from '@/views/components';
import { ref } from 'vue';
import { unitDetailData, unitAbilitiesData, unitAbilitiesHandler } from '@/store/unit1/unitData';
import { throttle } from '@/utils/throttle';

const awakened = ref(false);
const toAwakened = throttle(() => {
  awakened.value = !awakened.value;
  unitAbilitiesHandler.updateAwakening(awakened.value);
}, 300);
</script>

<style lang="scss" scoped>
@import "./unit-abilities-awakenings.scss";
</style>