<template>
  <canvasRender :media-query-options="{ value: '(max-width:860px)', callback: [updateMediaMatch] }"
    :renderer="monmusuSpine.renderer" :right-max-width="'350px'" :right-width="'30%'">
    <template #left>
      <spineConfig></spineConfig>
      <spineLoadTabs></spineLoadTabs>
      <voiceDisplay></voiceDisplay>
    </template>
    <template #right>
      <voiceAndAnimation></voiceAndAnimation>
    </template>
  </canvasRender>
</template>

<script setup lang="ts">
import { monmusuSpine } from "@/store/unit1/unitData";
import canvasRender from "@/views/components/canvasRender";
import voiceAndAnimation from "../voiceAndAnimation";
import spineLoadTabs from "./components/spineLoadTabs";
import voiceDisplay from "./components/voiceDisplay";
import spineConfig from "./components/spineConfig";
import { updateMediaMatch } from "../unit";
</script>