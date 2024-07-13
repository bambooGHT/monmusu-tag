<template>
  <section class="viceoAndAnimation family-Roboto">
    <skeleton class="list-style" :loading="loading">
      <template #template>
        <div>
          VOICE
        </div>
        <li style="list-style: none;" v-for="index of 30">
          <skeleton></skeleton>
        </li>
      </template>
      <voice>VOICE</voice>
    </skeleton>
    <skeleton class="list-style animation-list" :loading="loading">
      <template #template>
        <div>
          ANIMATION
        </div>
        <li style="list-style: none;" v-for="index of 1">
          <skeleton></skeleton>
        </li>
      </template>
      <animation>ANIMATION</animation>
    </skeleton>
  </section>
</template>

<script setup lang="ts">
import animation from './components/animation';
import voice from './components/voice';
import { loading } from "../unit";
import skeleton from '@/views/components/skeleton';
</script>

<style lang="scss">
@import "./voiceAndAnimation.scss";
</style>