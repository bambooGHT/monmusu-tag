<template>
  <section id="gallery" class="gallery family-Roboto" v-if="galleryList">
    <div class="gallery-total">
      <span>column: {{ galleryList.list.length }}</span>
      <span>total: {{ galleryList.total }}</span>
    </div>
    <ul class="gallery-list">
      <li v-for="list of galleryList.list">
        <a @click="toAnchorPos($event)" :href="'#' + list[0].header_title" :id="list[0].header_title">
          # {{ list[0].header_title }}
        </a>
        <ol class="gallery-list-column">
          <li v-for="(item, index) of list">
            <figure @click="enlargeToggle($event.currentTarget as any)"
              @transitionend="enlargeRemoveOverflow($event.currentTarget as any)"
              :data-pos="index === 0 ? 'left' : 'right'">
              <div class="gallery-base64">
                <img :src="item.base64">
              </div>
              <img :ref="el => el && lazyload.observePic(el as any)" :data-src="Url(item.src)" class="gallery-img"
                decoding="async">
              <figcaption><time :datetime="item.date">{{ item.title }}</time></figcaption>
            </figure>
          </li>
        </ol>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { Url } from "@/service";
import gallery from "./gallery";
import lazyload from "@/utils/lazyLoad";

const { galleryList, enlargeRemoveOverflow, enlargeToggle, toAnchorPos } = gallery();
</script>

<style lang="scss" scoped>
@import "./gallery.scss";
</style>