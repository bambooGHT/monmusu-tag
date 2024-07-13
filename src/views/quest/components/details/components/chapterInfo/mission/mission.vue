<template>
  <rewards2 class="mission" ref="missionDOM" :data="questData.missionList" v-slot="{ item: { text, rewardtable } }">
    <p :title="text">{{ text }}</p>
    <div v-for="{ id, iconKey, rarity, text, name, count } of rewardtable" :key="id">
      <propComponent class="icon" :id :iconKey :rarity :text :seat="'right'">
      </propComponent>
      <p>&nbsp;{{ `${name} *${count}` }}</p>
    </div>
  </rewards2>
</template>

<script setup lang="ts">
import { questData } from '@/store/quest';
import mission from "./mission";
import propComponent from '@/views/components/propComponent';
import { rewards2 } from '../../rewardsComponents';

const { missionDOM } = mission();
</script>

<style lang="scss" scoped>
.mission {
  display: block;
  position: relative;

  :deep(li) {
    position: absolute;

    p {
      @include text-ellipsis;
    }

    &:nth-of-type(3n) {
      margin-left: 66.66%;
    }

    &:nth-of-type(3n-1) {
      margin-left: 33.33%;
    }

    @media (width<=860px) {
      &:nth-of-type(3n) {
        margin-left: 0%;
      }

      &:nth-of-type(3n-1) {
        margin-left: 0%;
      }

      &:nth-of-type(even) {
        margin-left: 50%;
      }
    }
  }

  @media (width<=580px) {
    display: flex;

    :deep(li) {
      position: initial;

      &:nth-of-type(even) {
        margin-left: 0%;
      }
    }
  }
}
</style>