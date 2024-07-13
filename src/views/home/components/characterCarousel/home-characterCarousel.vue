<template>
  <article id="characterCarousel">
    <ul id="characterCarousel-list">
      <li v-for="item of characterCarouselSrc.carouselList">
        <picture>
          <source decoding="async" loading="lazy" media="(min-width: 740px)"
            :ref="el => el && lazyload.observePic(el as any, item.character)">
          <img decoding="async" loading="lazy" :ref="el => el && lazyload.observePic(el as any)"
            :data-src="item.character1">
        </picture>
      </li>
    </ul>

    <ul id="characterCarousel-navs">
      <li v-for="(item, index) of characterCarouselSrc.carouselList" :key="index">
        <div class="nav-index">
          <img decoding="async" loading="lazy" :ref="el => el && lazyload.observePic(el as any)"
            :data-src="item.thumbnail_off">
          <img decoding="async" loading="lazy" :ref="el => el && lazyload.observePic(el as any)"
            :data-src="item.thumbnail">
        </div>
      </li>
    </ul>

    <div class="cutover-prev">
      <img decoding="async" loading="lazy" :ref="el => el && lazyload.observePic(el as any)"
        :data-src="characterCarouselSrc.left">
    </div>
    <div class="cutover-next">
      <img decoding="async" loading="lazy" :ref="el => el && lazyload.observePic(el as any)"
        :data-src="characterCarouselSrc.right">
    </div>
  </article>
</template>

<script setup lang="ts">
import characterCarouselSrc from "@/assets/characterCarouselSrc.json";
import DCLLCarousel from "@/utils/carousel";
import { onMounted } from "vue";
import lazyload from "@/utils/lazyLoad";

onMounted(() => {
  DCLLCarousel({
    el: {
      main: "#characterCarousel",
      list: "#characterCarousel-list",
      nav: {
        list: "#characterCarousel-navs",
        prev: ".cutover-prev",
        next: ".cutover-next"
      }
    },
    autoPlay: {},
    slide: true,
    carouselEffect: "1",
  });
});

</script>

<style lang="scss" scoped>
@import "./home-characterCarousel.scss";
</style>