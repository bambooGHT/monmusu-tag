<template>
  <section class="search-result">
    <div v-if="isSearching">in search...</div>
    <ul class="results" v-if="resultList.list[0]">
      <li v-for="{
        character: { classId: job, id, resource, element: attr, rarityId: rarity, nickname, charaName },
        raceFeature, skill
      } of resultList.list" :key="id">
        <unitFace class="race" :id :resource :attr :rarity :job>
          <p>{{ nickname }}</p>
          <p>{{ charaName }}</p>
        </unitFace>
        <ul class="ability-text">
          <li v-if="skill">
            <p>
              <span v-if="skill.toggleIndex" class="cutover" @click="skill.toggleIndex!('prev')">◁ </span>
              <span>skill: {{ skill.name[skill.index] }}</span>
              <span v-if="skill.toggleIndex" class="cutover" @click="skill.toggleIndex!('next')"> ▷</span>
            </p>
            <p class="text" v-html="skill.text[skill.index]"></p>
          </li>
          <p class="split-line" v-show="raceFeature && skill"></p>
          <li v-if="raceFeature">
            <p>
              <span>raceFeature: {{ raceFeature.name }}</span>
            </p>
            <p class="text" v-html="raceFeature.text"></p>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import unitFace from '@/views/components/unitFace';
import { unitSearch } from '@/store/unit1/unitsearch';
const { resultList, isSearching } = unitSearch;
</script>

<style lang="scss">
@import "./search-resultList.scss";
</style>