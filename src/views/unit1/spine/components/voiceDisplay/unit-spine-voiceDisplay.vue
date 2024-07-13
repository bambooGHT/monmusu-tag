<template>
  <article class="voice-display-box" v-if="Object.keys(data.voiceEmotes)[0]"
    :style="{ backgroundColor: currentBackground ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)' }"
    :class="{ 'isplay': data.playProgress !== '100%' }">
    <div class="voice-txt">{{ voiceTitles[data.currentVoice.id] }}</div>
    <div class="voice-play-time">
      <time>{{ data.currentTime }}</time>
      <div class="voice-play-progress"></div>
      <time>{{ data.duration }}</time>
    </div>
    <div class="voice-txt">{{ voiceText }}</div>
  </article>
</template>

<script setup lang="ts">
import { monmusuVoice } from '@/store/unit1/unitData';
import { voiceTitles } from '@/store/unit1/unitData/voice';
import { currentBackground } from '../../unit-spine';
import { computed } from "vue";

const { data } = monmusuVoice;
const voiceText = computed(() => {
  const { id, index } = data.currentVoice;
  let message = data.voiceEmotes[id]?.message;
  if (message?.includes("／")) {
    const text = message.split("／")[index];
    if (text) message = text;
  }

  return message;
});
</script>

<style lang="scss" scoped>
.voice-display-box {
  @include position-abs-center;
  visibility: hidden;
  top: auto;
  bottom: 0;
  z-index: 9;
  margin-bottom: 5px;
  padding: 8px 15px 4px;
  width: 80%;
  height: max-content;
  backdrop-filter: blur(1px);
  opacity: 0;
  text-align: center;
  color: #fff;
  transition: .2s .6s;

  @media (width<=860px) {
    width: 85%;
  }

  .voice-play-time {
    display: flex;
    align-items: center;
    margin: auto;
    width: 85%;
  }

  time {
    font-size: clamp(1.2rem, 1.6vw, 1.4rem);
  }

  .voice-play-progress {
    position: relative;
    margin: 0 10px 2px;
    border-radius: 5px;
    width: 90%;
    height: 8px;
    background: linear-gradient(to left, #1e9ff5, #1e9ff5) no-repeat, rgb(255 255 255 / 41.1%);
    background-size: v-bind("data.playProgress");

    &::before,
    &::after {
      position: absolute;
      left: 0;
      z-index: -1;
      border-radius: 5px;
      width: 100%;
      height: 100%;
      content: '';
    }

    &::after {
      width: v-bind("data.loadProgress");
      background: rgb(250 250 250);
    }
  }

  .voice-txt {
    line-height: 1.2;
    font-size: clamp(1.3rem, 1.7vw, 1.7rem);
  }
}

.isplay {
  visibility: visible;
  opacity: 1;
  transition: .3s;
}
</style>