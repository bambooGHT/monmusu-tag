<template>
  <ul class="token-data">
    <li>initialStock: {{ tokenData.stock }}</li>
    <li>duration: {{ duration() }}</li>
    <li>coolTime: {{ timeCalculate(0, tokenData.interval, tokenData.interval, FPS) }} s</li>
    <li>firstCoolTime: {{ timeCalculate(0, tokenData.standby, tokenData.standby, FPS) }} s</li>
  </ul>
</template>

<script setup lang="ts">
import { unitDetailData } from "@/store/unit1/unitData";
import { timeCalculate } from "@/data/calc/calculateFunction";

const FPS = EMap.MapBase.FPS;
const { tokenData } = unitDetailData;
const duration = () => {
  return tokenData.time === -1 ? "∞" : timeCalculate(0, tokenData.time, tokenData.time, FPS) + " s";
};
</script>

<style lang="scss" scoped>
@import "./unit-abilities-tokenData.scss";
</style>