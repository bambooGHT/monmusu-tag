<template>
  <ul class="level-enemy-route" ref="routeDOM" v-if="routeList">
    <li v-for="(item, key) of routeList">
      <div class="level-route-draw" @click="levelMap.drawRoutePath(+key)">draw</div>
      <div>
        <div>
          route - {{ key }}
          <span class="level-route-count">
            {{ ` x${getTotal(item)}` }}
          </span>
        </div>
        <ul class="level-enemy-route-list">
          <li v-for="{ unit: { id, resource, element: attr, charaName }, count } of item" :key="id">
            <unitFace class="route-list-min" :resource :attr :rarity="82" :category="'enemy'">
            </unitFace>
            <p>{{ charaName }}</p>
            <span class="level-route-count">{{ ` *${count}` }}</span>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import unitFace from "@/views/components/unitFace";
import byRoute from "./quest-route-byRoute";
import { levelMap } from "@/store/quest";

const { routeDOM, getTotal, routeList } = byRoute();
</script>

<style lang="scss" scoped>
@import "./quest-route-byRoute.scss";
</style>