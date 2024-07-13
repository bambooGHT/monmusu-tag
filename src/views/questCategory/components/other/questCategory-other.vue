<template>
  <nav>
    <li v-for="p of otherData.other">
      <RouterLink :to="`/quest/${p.id}`" v-html="p.title"></RouterLink>
    </li>
    <li v-for="p of otherData.dungeon">
      <RouterLink :to="`/quest/${p.id}`" v-html="p.name"></RouterLink>
    </li>
  </nav>
</template>

<script setup lang="ts">
import { useSWRAsync } from "@/service";
import { onMounted, shallowReactive } from "vue";

const otherData = shallowReactive(<{ other: QUEST.QuestOther[], dungeon: ObjIndex<QUEST.Dungeon>; }>{});
onMounted(async () => {
  otherData.other = await useSWRAsync("questCategory", true, "other");
  otherData.dungeon = await useSWRAsync("questCategory", true, "dungeon");
});
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  flex-wrap: wrap;
  font-size: 1.3rem;

  li {
    margin: 2px 5px;
    border-bottom: solid var(--text-color) 1px;

    &:hover,
    &:active {
      border-bottom-color: var(--color-border);
      color: var(--text-color-hover);
    }
  }
}
</style>