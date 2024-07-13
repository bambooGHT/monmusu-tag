<template>
  <article class="news family-Meiryo">
    <ul class="news-list news-scroll">
      <li v-for="(item) of newsList" :class="{ 'current': item === current }" :key="item.id" @click="toggle(item)">
        <img :src="tagSrc[item.tag]">
        <time>{{ TimeFormat.formatArea(item.postedAt) }}</time>
        <p>{{ item.title }}</p>
      </li>
    </ul>
    <article class="news-info news-scroll" ref="infoDOM">
      <template v-if="current">
        <img :src="tagSrc[current.tag]">
        <time :datetime="TimeFormat.formatArea(current.postedAt)">
          {{ TimeFormat.formatArea(current.postedAt) }}
        </time>
        <p class="title">{{ current.title }}</p>
        <hr />
        <p class="text">{{ current.message }}</p>
      </template>
    </article>
  </article>
</template>

<script setup lang="ts">
import { useSWR } from '@/service';
import { News } from '@/service/types';
import TimeFormat from '@/utils/timeFormat';
import { ref } from 'vue';

const tagSrc = [
  "",
  "https://assets.game-monmusu-td.net/res/information/web/0/news/img/news_newslabel_maintenance.png",
  "https://assets.game-monmusu-td.net/res/information/web/0/news/img/news_newslabel_update.png",
  "https://assets.game-monmusu-td.net/res/information/web/0/news/img/news_bannerlabel_gacha.png",
  "https://assets.game-monmusu-td.net/res/information/web/0/news/img/news_bannerlabel_event.png",
  "https://assets.game-monmusu-td.net/res/information/web/0/news/img/news_badge_campaign.png",
  "https://assets.game-monmusu-td.net/res/information/web/0/news/img/news_newslabel_report.png",
  "https://assets.game-monmusu-td.net/res/information/web/0/news/img/news_newslabel_other.png"
];
const current = ref<News>();
const infoDOM = ref<HTMLElement>();
const toggle = (info: News) => {
  current.value = info;
  infoDOM.value!.scrollTop = 0;
};
const newsList = useSWR("news");
</script>

<style lang="scss" scoped>
@import "./home-news.scss";
</style>