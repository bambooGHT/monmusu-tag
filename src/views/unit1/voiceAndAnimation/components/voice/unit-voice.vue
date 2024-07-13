<template>
  <ul class="list-style">
    <div>
      <slot></slot>
    </div>
    <template v-if="voices[0]" v-for="([id, value]) of voices">
      <li v-for="(item, i) of Array.isArray(value) ? value : [value]">
        <clickButton @click="play(item, id, i)" class="button" :selected="true">
          {{ `${voiceTitles[id] || id}${i ? "_" + i : ""}` }}
        </clickButton>
      </li>
    </template>
    <div v-else style="margin: 0 auto;">NULL</div>
  </ul>
</template>

<script setup lang="ts">
import { monmusuVoice } from "@/store/unit1/unitData";
import { voiceTitles } from "@/store/unit1/unitData/voice";
import { clickButton } from "@/views/components";
import { throttle } from "@/utils/throttle";
import { computed } from "vue";

const voices = computed(() => {
  return Object.entries(monmusuVoice.data.voices);
});

const play = throttle((src: string, id: string, index: number) => {
  monmusuVoice.play(src, id, index);
}, 500);
</script>

<style lang="scss" scoped>
.button {
  background-color: transparent !important;
}
</style>