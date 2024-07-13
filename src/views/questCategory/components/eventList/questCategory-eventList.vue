<template>
  <article class="family-Roboto">
    <p class="p">count: {{ eventList.length }}</p>
    <nav class="quest-category-list">
      <li v-for="p of eventList">
        <RouterLink :to="`/quest/${p.chapter}`">
          <p><span>START</span><time :datetime="p.open_time">{{ TimeFormat.formtIsoDate(p.open_time) }}</time></p>
          <p><span>END</span><time :datetime="p.close_time">{{ TimeFormat.formtIsoDate(p.close_time) }}</time></p>
          <figure>
            <picture>
              <source decoding="async" loading="lazy" media="(min-width:741px)"
                :ref="el => el && (domList.dom.push(el), domList.fn.push(() => Url(p.src)))" />
              <img decoding="async" loading="lazy"
                :ref="el => el && (domList.dom.push(el), domList.fn.push(() => Url(p.banner_src2 || p.banner_src)))">
            </picture>
            <figcaption>{{ p.name }}</figcaption>
          </figure>
        </RouterLink>
      </li>
    </nav>
  </article>
</template>

<script setup lang="ts">
import { useSWRAsync } from "@/service";
import { Url } from '@/service';
import lazyload from "@/utils/lazyLoad";
import TimeFormat from "@/utils/timeFormat";
import { onMounted, onUpdated, ref } from "vue";

const domList = ref<{ dom: any[], fn: (() => string)[]; }>({ dom: [], fn: [] });
const eventList = ref<QUEST.EventList[]>([]);
onMounted(async () => {
  eventList.value = Object.values(await useSWRAsync("questCategory", true, "eventList"));
});
onUpdated(() => {
  const { dom, fn } = domList.value;
  lazyload.observePic(dom, fn);
});
</script>

<style lang="scss" scoped>
@import "./questCategory-eventList.scss";
</style>