<template>
  <ul class="abilites-text">
    <template v-for="p of updateList">
      <li v-if="p && p.value">
        <p class="text-title family-Roboto">
          <span class="cutover" v-if="p.value.indexUpdate" @click="p.value!.indexUpdate!('prev')">◁</span>
          <span>{{ p.value.name }}</span>
          <span class="cutover" v-if="p.value.indexUpdate" @click="p.value!.indexUpdate!('next')">▷</span>
        </p>
        <p class="text-title" v-if="p.value.levelUpdate">
          <span class="cutover" @click="p.value!.levelUpdate!('prev')">◁</span>
          <span>{{ p.value.levelIndex }}</span>
          <span class="cutover" @click="p.value!.levelUpdate!('next')">▷</span>
        </p>
        <div class="text">
          <span v-html="p.value.text.join('')"></span>
        </div>
        <div class="text1" v-for="otherText of p.value.abilitiesText">
          <p v-for="text of otherText">{{ text }}</p>
        </div>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import textUpdate from './unit-abilities-text';

const updateList = textUpdate();
</script>

<style lang="scss" scoped>
@import "./unit-abilities-text.scss";
</style>