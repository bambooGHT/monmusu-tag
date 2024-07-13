<template>
  <nav class="quest-category-list family-Century" v-if="mainData">
    <li v-for="item of mainData">
      <RouterLink :to="`/quest/${item.id}`">
        <p>{{ item.id === 1  ? "序" :item.id- 1 }}章</p>
        <p>{{ item.after_message }}</p>
      </RouterLink>
    </li>
    <i></i>
  </nav>
</template>

<script setup lang="ts">
import { useSWRAsync } from "@/service";
import { onMounted, ref } from "vue";

const mainData = ref();
onMounted(async () => {
  mainData.value = await useSWRAsync("questCategory", true, "main");
});
</script>

<style lang="scss" scoped>
@import "./questCategory-main.scss";
</style>