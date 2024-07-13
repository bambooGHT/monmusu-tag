<template>
  <section class="search-text">
    <p class="search-tip"><span>format: </span>include<i>|</i>exclude</p>
    <p>
      <span>skill: </span>
      <input :ref="el => inputDOM.push(el as HTMLInputElement)" v-model="searchText.skill"
        class="input-style input-border" placeholder="value,value...|value..."  type="search" @keyup.enter="toSearch">
    </p>
    <p>
      <span>raceFeature: </span>
      <input :ref="el => inputDOM.push(el as HTMLInputElement)" v-model="searchText.raceFeature"
        class="input-style input-border" type="search" @keyup.enter="toSearch">
    </p>
    <p class="to-search">
      <label @click="toSearch">search</label>
    <div>
      <p>result: {{ resultList.list.length }}</p>
      <p v-if="resultList.excludeCount">( exclude quantity: {{ resultList.excludeCount }} )</p>
    </div>
    </p>
  </section>
</template>

<script setup lang="ts">
import searchInput from './search-Input';
import { unitSearch } from '@/store/unit1/unitsearch';

const { resultList } = unitSearch;
const { inputDOM, searchText, toSearch } = searchInput();
</script>

<style lang="scss" scoped>
@import "./search-Input.scss";
</style>