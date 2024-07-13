<template>
  <article class="unitList-sort">
    <div v-for="(p, i) of sortArr" :class="{ active: index === i }" @click="toSort(p.id, i)">
      {{ p.name }}</div>
    <div @click="toReverse" class="reverse" :class="{ reverse1: !reverse }">⇢</div>
  </article>
</template>

<script setup lang="ts">
import sort from "./unitList-sort";
const { index, toReverse, toSort, sortArr, reverse } = sort();
</script>

<style lang="scss" scoped>
@import "./unitList-sort.scss"
</style>