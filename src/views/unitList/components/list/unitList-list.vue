<template>
  <ul class="unit-list-info family-Meiryo" v-show="current.forList.length">
    <li v-if="current.type === 'token'" v-for="{ id, unit, isItself } of current.forList as TokenInfo"
      :title="unit.text || unit.charaName" v-show="current.showState.get(id)" :key="'token' + id">
      <unitFace :id="isItself ? unit.id : id" :resource="unit.resource" :attr="unit.element || ''"
        :rarity="unit.rarityId || 82" :job="unit.classId || ''" :category="current.type">
        <p>【{{ unit.nickname || 'なし' }}】</p>
        <p>{{ unit.charaName }}</p>
      </unitFace>
    </li>
    <li v-else v-for="p of current.forList as ListInfo" :title="p.text || p.charaName"
      v-show="current.showState.get(p.id)" :key="p.id">
      <unitFace :resource="p.resource" :id="p.id" :attr="p.element || ''" :rarity="p.rarityId || 82"
        :job="p.classId || ''" :category="current.type">
        <p>【{{ p.nickname || 'なし' }}】</p>
        <p>{{ p.charaName }}</p>
      </unitFace>
    </li>
  </ul>
</template>

<script setup lang="ts">
import unitFace from '@/views/components/unitFace';
import { unitListData } from '@/store/unit1/unitList';
import { ListInfo, TokenInfo } from '@/store/unit1/unitList/types';

const { current } = unitListData;
</script>

<style lang="scss" scoped>
@import "./unitList-list.scss";
</style>