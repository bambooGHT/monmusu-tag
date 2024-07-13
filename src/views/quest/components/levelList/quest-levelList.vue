<template>
  <ul class="level-list">
    <li v-if="loaded" v-for="item of questData.levelList"
      :class="{ active: questData.currentLevel?.data.id === item.id }" @click="toggleLevel(item.id)">
      <p v-html="item.name"></p>
      <p class="family-Century">
        <template v-if="item.iconUrl">
          <span>consume</span>
          <img :src="item.iconUrl" alt="consume-icon"> *{{ item.mana }}
        </template>
        <template v-else>
          <span>consume stamina</span>
          {{ item.mana || 0 }}
        </template>
      </p>
      <p class="family-Century"><span>recommend rank</span>{{ item.recommendLevel }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { questData, questControl } from '@/store/quest';
import { loaded, updateTitle, } from '../../quest';
import router from '@/router';

let LevelLoaded = true;
const toggleLevel = async (levelId: any) => {
  if (!LevelLoaded) return;

  LevelLoaded = false;
  const id = router.currentParamId;
  router.replace("quest", id, { levelId });
  await questControl.updateCurrentLevel(levelId);
  updateTitle();
  LevelLoaded = true;
};
</script>

<style lang="scss" scoped>
@import "./quest-levelList.scss";
</style>