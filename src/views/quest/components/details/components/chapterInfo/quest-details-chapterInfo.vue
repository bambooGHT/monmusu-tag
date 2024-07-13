<template>
  <article class="chapter-info" ref="dom">
    <img v-if="chapterInfo.src" class="chapter-img" :src="Url(chapterInfo.src)" alt="chapter-img">
    <h1 class="title family-Meiryo" v-html="chapterInfo.name"></h1>
    <textBgTransition>
      introduction
    </textBgTransition>
    <p v-html="chapterInfo.text || 'null'"></p>
    <template v-if="chapterInfo.open_time">
      <textBgTransition>
        open date
      </textBgTransition>
      <p>
        {{ `【${TimeFormat.formtIsoDate(chapterInfo.open_time)}】 ～ 【${TimeFormat.formtIsoDate(chapterInfo.close_time!)}】`
        }}
      </p>
    </template>
    <textBgTransition>
      rewards
    </textBgTransition>
    <template v-if="tabList.length">
      <tabs class="chapterInfo-rewardList" :list="tabList" v-model:index="currentTab"></tabs>
      <component v-if="currentTab === 'mission'" :is="mission"></component>
      <component v-else v-for="node of rewardsComponents[rewardsList[currentTab].type](rewardsList[currentTab])"
        :is="node">
      </component>
    </template>
    <div v-else>null</div>
  </article>
</template>

<script setup lang="ts">
import { questData } from '@/store/quest';
import { textBgTransition } from '@/views/components';
import tabs from '@/views/components/tabs';
import mission from "./mission";
import rewardsComponents from "./rewardsList";
import { tabList, rewardsList, currentTab } from './quest-details-chapterInfo';
import { onUpdated, ref } from 'vue';
import { Url } from '@/service';
import TimeFormat from '@/utils/timeFormat';

const { chapterInfo } = questData;
const dom = ref<HTMLDivElement>();

onUpdated(() => {
  const box = (<HTMLDivElement>dom.value!.parentNode!);
  const rewardListDOM = (<HTMLDivElement>dom.value!.querySelector(".chapterInfo-rewardList"));
  box.scrollTop = rewardListDOM.offsetTop - box.offsetTop - 35;
});
</script>

<style lang="scss" scoped>
p {
  white-space: pre-wrap;
}

.chapterInfo-rewardList {
  position: sticky;
  top: 0;
  z-index: 1;
  margin-bottom: 5px;
  background-color: var(--color-bg);
}

.chapter-img {
  max-height: 100px;
}
</style>