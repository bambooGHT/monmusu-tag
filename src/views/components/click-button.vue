<template>
  <div class="button" :class="{ selected }" :style="{ width, height }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
type value = {
  width?: string;
  height?: string;
  selected?: boolean;
};

const { width, height, selected } = defineProps<value>();
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  margin: 0 auto;
  padding: 0 5px;
  cursor: pointer;
  transition: .2s;

  &::before,
  &::after {
    position: absolute;
    width: 5px;
    height: 5px;
    content: "";
    transition: .3s;
  }

  &::before {
    right: -2px;
    top: -2px;
    border-right: 2px solid var(--color-border-btn);
    border-top: 2px solid var(--color-border-btn);
  }

  &::after {
    left: -2px;
    bottom: -2px;
    border-left: 2px solid var(--color-border-btn);
    border-bottom: 2px solid var(--color-border-btn);
  }

  &:hover {
    background-color: rgb(var(--color-bg-rgb-2) / 62.4%) !important;

  }
}

.selected {
  background-color: rgb(var(--color-bg-rgb-2) / 62.4%) !important;

  &::before,
  &::after {
    width: calc(100% + 2px);
    height: calc(100% + 2px);
  }
}
</style>