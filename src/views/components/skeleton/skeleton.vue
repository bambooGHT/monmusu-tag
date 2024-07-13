<template>
  <div :style="{ fontSize }" :class="{ 'skeleton-template': !$slots.template, 'skeleton-animation': animation }"
    v-bind="$attrs" v-if="loading">
    <slot name="template">{{ $slots.template ? "" : "&nbsp;" }}</slot>
  </div>
  <slot v-else></slot>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false
});
withDefaults(defineProps<{ loading?: boolean; minTime?: number; animation?: boolean; fontSize?: string; }>(), {
  loading: true,
  minTime: 250,
  animation: false
});
</script>
<style lang="scss" scoped>
@import "./skeleton.scss";
</style>