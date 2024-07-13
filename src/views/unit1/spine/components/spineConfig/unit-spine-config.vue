<template>
  <article class="spine-config" :class="{ isDisplay: configDisplay }">
    <clickButton @click="configDisplay = true" :selected="configDisplay" class="spine-config-display-button1">
      <label>
        <svg t="1677505832852" class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" p-id="1633"
          width="20" height="20" transform="translate(0 3)">
          <path
            d="M588.8 128l12 83.2 4.8 34.4 31.2 14.4c12.8 6.4 26.4 13.6 38.4 21.6l28 18.4 31.2-12 81.6-32 76 127.2-67.2 51.2-28 21.6 3.2 35.2c0.8 7.2 0.8 14.4 0.8 20.8s0 13.6-0.8 20.8l-3.2 35.2 28 21.6 67.2 51.2-75.2 127.2-82.4-32-31.2-12-28 18.4c-12.8 8.8-25.6 16-38.4 21.6l-31.2 14.4-4.8 33.6-12 84H435.2l-12-83.2-4.8-34.4-31.2-14.4c-12.8-6.4-26.4-13.6-38.4-21.6l-28-18.4-31.2 12L208 768l-76-127.2 67.2-51.2 28-21.6-3.2-35.2c-0.8-7.2-0.8-14.4-0.8-20.8s0-13.6 0.8-20.8l3.2-35.2-28-21.6-67.2-51.2L207.2 256l82.4 32 31.2 12 28-18.4c12.8-8.8 25.6-16 38.4-21.6l31.2-14.4 4.8-33.6L435.2 128h153.6m8.8-64H426.4c-27.2 0-49.6 19.2-53.6 44.8L360 201.6c-16 7.2-31.2 16-47.2 26.4l-90.4-35.2c-6.4-2.4-12.8-3.2-19.2-3.2-19.2 0-37.6 9.6-46.4 26.4L71.2 360c-13.6 22.4-8 52 12.8 68l76 57.6c-0.8 9.6-1.6 18.4-1.6 26.4s0 16.8 1.6 26.4l-76 57.6c-20.8 16-26.4 44-12.8 68l84.8 143.2c9.6 16.8 28 27.2 47.2 27.2 6.4 0 12-0.8 18.4-3.2L312 796c15.2 10.4 31.2 19.2 47.2 26.4l13.6 92c3.2 25.6 26.4 45.6 53.6 45.6h171.2c27.2 0 49.6-19.2 53.6-44.8l13.6-92.8c16-7.2 31.2-16 47.2-26.4l90.4 35.2c6.4 2.4 12.8 3.2 19.2 3.2 19.2 0 37.6-9.6 46.4-26.4l85.6-144.8c12.8-23.2 7.2-51.2-13.6-67.2l-76-57.6c0.8-8 1.6-16.8 1.6-26.4 0-9.6-0.8-18.4-1.6-26.4l76-57.6c20.8-16 26.4-44 12.8-68l-84.8-143.2c-9.6-16.8-28-27.2-47.2-27.2-6.4 0-12 0.8-18.4 3.2L712 228c-15.2-10.4-31.2-19.2-47.2-26.4l-13.6-92c-4-26.4-26.4-45.6-53.6-45.6zM512 384c70.4 0 128 57.6 128 128s-57.6 128-128 128-128-57.6-128-128 57.6-128 128-128m0-64c-105.6 0-192 86.4-192 192s86.4 192 192 192 192-86.4 192-192-86.4-192-192-192z"
            p-id="1634" :fill="currentBackground ? '#ffffffce' : '#0000004d'"></path>
        </svg>
      </label>
    </clickButton>
    <section class="spine-config-box">
      <label @click="configDisplay = false" class="spine-config-display-button2">
        <span></span>
        <span></span>
      </label>
      <div class="spine-config-list">
        <ul class="config-switch">
          <li v-for="(p, key) in unitSpineProgram.spineConfig.events">
            <span>{{ key }}</span>
            <switchButton :id="key" :checked="p" @switch="(checked) => unitSpineProgram.updateEvent(key, checked)">
            </switchButton>
          </li>
          <li v-for="(p, key) in unitSpineProgram.spineConfig.debug">
            <span>{{ key }}</span>
            <switchButton :id="key" :checked="p" @switch="(checked) => unitSpineProgram.updateDebug(key, checked)">
            </switchButton>
          </li>
        </ul>
        <ul class="config-options">
          <li>
            <span>Background</span>
            <select class="input-style input-border" name="Background" :value="unitSpineProgram.spineConfig.background"
              @change="updateBackground((<HTMLInputElement>$event.target).value)">
              <option v-for="(p, key) in unitSpineProgram.backgrounds" :value="key">
                {{ key }}
              </option>
            </select>
          </li>
          <li>
            <span>bgBlur</span>
            <input class="input-style input-border" min="0" max="100" :value="unitSpineProgram.spineConfig.bgBlur"
              @change="unitSpineProgram.updateBgBlur(Number((<HTMLInputElement>$event.target).value))" type="number">
          </li>
          <li>
            <span>AnimationSpeed</span>
            <input class="input-style input-border" min="0.1" max="5" step="0.1"
              :value="unitSpineProgram.spineConfig.animationSpeed"
              @input="unitSpineProgram.updateAnimationSpeed(Number((<HTMLInputElement>$event.target).value))"
              type="number">
          </li>
        </ul>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { clickButton, switchButton } from "@/views/components";
import { monmusuSpine } from '@/store/unit1/unitData';
import { currentBackground } from '../../unit-spine';

const configDisplay = ref(false);
const { unitSpineProgram } = monmusuSpine;
const updateBackground = (key: string) => {
  unitSpineProgram.updateBackground(key);
  currentBackground.value = key === "black" ? true : false;
};
</script>

<style lang="scss" scoped>
@import "./unit-spine-config.scss";
</style>