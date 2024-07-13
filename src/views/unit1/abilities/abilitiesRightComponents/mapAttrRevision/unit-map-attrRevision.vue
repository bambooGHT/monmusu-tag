<template>
  <section class="ability-map">
    <input type="checkbox" id="map">
    <label for="map">MAP</label>
    <p @click="tpQuest(curMap.chapterId)">{{ curMap.name }}</p>
    <p @click="tpQuest(curMap.chapterId, curMap.levelId)" v-html="curMap.text"></p>
    <ul class="map-list">
      <li v-for="map of entranceMap.list" :key="map.chapterId" :class="{ 'current': curMap === map }"
        @click="unitAbilitiesHandler.updateCurrentMap(map)">
        <label for="map">
          <span v-html="map.text"></span> - <span>{{ map.category }}</span>
        </label>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import router from "@/router";
import { unitAbilitiesData, unitAbilitiesHandler } from "@/store/unit1/unitData";
import { computed } from "vue";

const { entranceMap } = unitAbilitiesData;
const curMap = computed(() => {
  return entranceMap.current;
});
const tpQuest = (id: number, levelId?: number) => {
  router.push("quest", id, levelId ? { levelId } : undefined);
};
</script>

<style lang="scss" scoped>
@import "./unit-map-attrRevision.scss";
</style>