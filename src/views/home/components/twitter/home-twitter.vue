<template>
  <skeleton class="tw" :loading="loading" animation>
  </skeleton>
  <article class="tw tw-1" :class="{ 'tw-hide': loading }">
    <a class="twitter-timeline" href="https://twitter.com/monmusu_td&original_referer=https://monmusu-td.jp"></a>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import tw from './home-twitter';
import skeleton from '@/views/components/skeleton';

const loading = ref(true);
; (async () => {
  await tw();
  (<any>window).twttr.ready((twttr: any) => {
    twttr.events.bind('loaded', () => loading.value = false);
  });
})();
</script>

<style lang="scss" scoped>
.tw {
  position: relative;
  padding-bottom: 31.2%;
  width: 45%;
  height: 0;
}

.tw-1 {
  overflow: auto;
}

@media (width < 740px) {
  .tw {
    padding-bottom: 0%;
    width: 98%;
    height: 350px;
  }
}

.tw-hide {
  overflow: hidden;
  margin: 0 !important;
  padding-bottom: 0 !important;
  height: 0 !important;
}
</style>