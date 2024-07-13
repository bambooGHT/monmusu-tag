<template>
  <ul class="unit-info">
    <li v-for="{ title, imgText, img, text } of getInfoList()">
      <span>{{ title }}</span>
      <span :title="imgText">
        <img v-if="img" :src="Url(img)" :alt="text">
        <template v-else>{{ text }}</template>
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Url } from '@/service';
import getInfoList from './unit-abilities-info';

</script>

<style lang="scss" scoped>
@import "./unit-abilities-info.scss";
</style>