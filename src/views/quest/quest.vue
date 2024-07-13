<template>
  <section class="quest">
    <MAP></MAP>
    <questDetails v-if="loaded"></questDetails>
  </section>
</template>

<script setup lang="ts">
import MAP from './components/levelMap';
import questDetails from './components/details';
import { quest, loaded } from "./quest";

quest();
</script>

<style scoped>
.quest {
  overflow: hidden;
  margin: 5px 3px;
  height: 100%;
}
</style>