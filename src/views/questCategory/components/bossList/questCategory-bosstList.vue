<template>
  <article class="family-Roboto">
    <p class="p">size: {{ Object.keys(list || []).length }}</p>
    <nav class="quest-category-list">
      <li v-for="(p) of list">
        <RouterLink :to="`/quest/${p.id}`">
          <figure>
            <img :ref="el => el && DOMList.push(el)" class="img" decoding="async" loading="lazy" :data-src="Url(p.src)">
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
import { onMounted, onUpdated, ref } from "vue";

const list = ref<ObjIndex<QUEST.Boss>>();
const DOMList = ref<any[]>([]);
onMounted(async () => {
  list.value = await useSWRAsync("questCategory", true, "boss");
});
onUpdated(() => {
  lazyload.observePic(DOMList.value);
});
</script>

<style lang="scss" scoped>
li {
  figure {
    position: relative;
    margin: 0 5px;
    padding-bottom: 37%;
  }

  .img {
    position: absolute;
  }
}
</style>