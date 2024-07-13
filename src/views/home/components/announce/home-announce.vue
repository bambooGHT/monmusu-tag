<template>
  <article class="announce">
    <ul class="announce-list">
      <li v-for="p of imgArr" :key="p.id">
        <img decoding="async" loading="lazy" :src="Url(p.src)">
      </li>
    </ul>
  </article>
</template>

<script setup lang="ts">
import { Url, useSWR } from '@/service';
const imgArr = useSWR("announceImages");
</script>

<style lang="scss" scoped>
@import "./home-announce.scss";
</style>