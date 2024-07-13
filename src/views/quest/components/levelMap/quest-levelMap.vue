<template>
  <canvasRender :renderer="levelMap.renderer"
    :media-query-options="{ value: '(max-width:860px)', callback: [updateMediaMatch] }" :right-max-width="'315px'"
    :right-width="'26%'">
    <template #right>
      <levelList></levelList>
    </template>
  </canvasRender>
</template>

<script setup lang="ts">
import { levelMap } from "@/store/quest";
import canvasRender from "@/views/components/canvasRender";
import levelList from "../levelList";
import { updateMediaMatch } from "../details";
import { onBeforeUnmount } from "vue";

onBeforeUnmount(() => {
  levelMap.destroy();
});
</script>