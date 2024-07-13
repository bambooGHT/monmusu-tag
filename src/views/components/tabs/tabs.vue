<template>
  <nav class="family-Century" :class="styleName || 'tabs'">
    <a v-for="p of list" :class="{ 'select': index === p }" @click="index = p, $emit('update', p)">
      {{ p.toUpperCase() }}
    </a>
  </nav>
</template>

<script setup lang="ts">
type data = {
  list: string[];
  styleName?: "tabs" | "tabs-1";
};
const index = defineModel<string>("index", { required: true, });
defineEmits(["update"]);
defineProps<data>();
</script>

<style lang="scss" scoped>
@import "./tabs.scss";
</style>