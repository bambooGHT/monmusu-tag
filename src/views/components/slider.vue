<template>
  <input class="input-style slider" type="range" :style="{ 'background-size': backgroundSize, width: data.width }"
    :value="value" @input="update('update', +(<any>$event.target).value);" :min="data.min" :max="data.max" step="1">
</template>

<script setup lang="ts">
import { computed } from 'vue';
const update = defineEmits(["update"]);
const data = defineProps<{
  min: number, max: number; value: number, width: string;
}>();

const backgroundSize = computed(() => {
  return data.value / data.max * 100 + "%";
});
</script>

<style lang="scss" scoped>
.slider {
  margin: 0 10px;
  border-radius: 20px;
  max-width: 500px;
  height: 8px;
  background: linear-gradient(to left, #0bf, #0bf) no-repeat var(--color-bg-slider);

  &::-webkit-slider-thumb:active {
    background-color: #38caff;
  }

  &::-webkit-slider-thumb {
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    appearance: none;
    background-color: #00b0f0;
    box-shadow: 0 0 0.7rem rgba($color: #535353, $alpha: 50%);
    cursor: pointer;
  }

  &::-moz-range-thumb {
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    appearance: none;
    background-color: #00b0f0;
    box-shadow: 0 0 0.7rem rgba($color: #000, $alpha: 50%);
    cursor: pointer;
  }

  &::-ms-thumb {
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #0bf;
    box-shadow: 0 0 0.7rem rgba($color: #000, $alpha: 50%);
    cursor: pointer;
  }
}
</style>