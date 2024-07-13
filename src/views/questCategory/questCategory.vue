<template>
  <section>
    <tabs :list="Object.keys(quests)" v-model:index="currentQuest"></tabs>
    <component :is="quests[currentQuest]"></component>
  </section>
</template>

<script setup lang="ts">
import tabs from '../components/tabs';
import { quests, currentQuest } from "./questCategory";
</script>

<style lang="scss">
@import "./components/list-style.scss";
</style>