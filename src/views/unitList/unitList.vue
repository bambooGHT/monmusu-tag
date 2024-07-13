<template>
  <section class="unitList">
    <tabs :index="current.type" :list="listName" @update="toUnitList"></tabs>
    <unitfilter></unitfilter>
    <unitSort v-if="current.type === 'character'"></unitSort>
    <unitListInfo></unitListInfo>
  </section>
</template>

<script setup lang="ts">
import router from '@/router';
import tabs from '../components/tabs';
import unitfilter from "./components/filter";
import unitListInfo from "./components/list";
import unitSort from "./components/sort";
import { unitListData } from "@/store/unit1/unitList";
import { message } from '@/message';
import { updatePageMeta } from '@/router/title';

const { current, toggleUnitList } = unitListData;
const listName: UNIT.UnitType[] = ["character", "beastGod", "enemy", "token"];
const unitStatus = router.getCurrentQuery("unitList").category;

if (unitStatus && listName.includes(unitStatus)) {
  toggleUnitList(unitStatus);
  updatePageMeta("unitList - " + unitStatus);
} else if (unitStatus) {
  message.add({ type: "error", message: `"${unitStatus}" category does not exist` });
}

const toUnitList = async (value: UNIT.UnitType) => {
  router.replace("unitList", { category: value });
  await toggleUnitList(value);
  updatePageMeta("unitList - " + value);
};
</script>