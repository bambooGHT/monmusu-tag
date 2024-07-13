<template>
  <ul class="level-enemy-route2">
    <li v-for="{ unit: { id: key, resource, element: attr, charaName }, count, routes } of enemyList">
      <div class="level-route-draw" @click="levelMap.drawRoutePath(...routes.map(p => p[0]))">draw</div>
      <unitFace :key class="route-list-min" :resource :attr :rarity="82" :category="'enemy'">
      </unitFace>
      <div>
        <p>{{ charaName }}<span class="level-route-count">{{ ` *${count}` }}</span></p>
        <ul>
          <li class="level-route-draw" v-for="[id, count1] of routes" @click="levelMap.drawRoutePath(id)">
            {{ id }}<span class="level-route-count">{{ `*${count1}` }}</span>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { questData, levelMap } from '@/store/quest';
import type { EnemyDeployValue } from '@/store/quest/types';
import unitFace from '@/views/components/unitFace';
import { computed } from 'vue';

type enemyRoutes = EnemyDeployValue & { routes: [number, number][]; };

const enemyList = computed(() => {
  const enemy = questData.currentLevel?.detailedData.enemyDeployCount.enemyDeployRoutesCount || {};
  const result = Object.entries(enemy).reduce((data: ObjIndex<enemyRoutes>, [routeId, value]) => {
    value.forEach(({ count, unit }) => {
      const index = data[unit.id] ??= {
        unit,
        count: 0,
        routes: []
      };
      index.routes.push([+routeId, count]);
      index.count += count;
    });
    return data;
  }, {});

  return Object.values(result);
});
</script>

<style lang="scss" scoped>
@import "./quest-route-byEnemy.scss";
</style>