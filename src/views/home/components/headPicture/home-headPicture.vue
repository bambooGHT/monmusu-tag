<template>
  <div class="head">
    <figure class="thumbnail">
      <img v-if="data?.base64" :src="data.base64" alt="monmusu-td-gallery-thumbnail">
    </figure>
    <figure class="img head-img-wh">
      <template v-if="data?.src?.includes('blob')">
        <img class="imganima" :src="data.src" alt="monmusu-td-gallery">
        <figcaption class="family-Roboto">
          <div class="img-title">
            <span>{{ data.header_title }}</span>
            <span>{{ data.title }}</span>
          </div>
          <RouterLink class="gallery" to="/gallery">gallery<span>⇨</span></RouterLink>
        </figcaption>
      </template>
    </figure>
    <loadProgress v-if="data?.src" :url="data.src" :fn="(value: string) => data.src = value">
    </loadProgress>
  </div>
</template>

<script setup lang="ts">
import { useSWR } from '@/service';
import loadProgress from '@/views/components/loadProgress';

const data = useSWR("galleryRandom", false);
</script>

<style scoped>
@import "./home-headPicture.css";
</style>