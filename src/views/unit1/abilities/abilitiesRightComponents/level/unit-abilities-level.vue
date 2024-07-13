<template>
  <div>
    <div class="unit-level-exp" v-if="unitAbilitiesData.expInfo">
      <div>EXP:{{ level.levelExp }}</div>
      <ul>
        <li v-for="({ text, name: id, rarity }, index) of unitAbilitiesData.expInfo">
          <propComponent :id seat="bottom" :rarity :text :iconKey="'wallet'">
            *{{ level.needExpPropsNum[index] || 0 }}
          </propComponent>
        </li>
      </ul>
    </div>
    <div class="level-slider" v-if="level">
      <input class="input-style input-border" type="number" :value="level.currentLevel" @change="toLevel($event)"
        :min="CLASS_LEVEL.MIN" :max="CLASS_LEVEL.MAX" step="1">
      <slider :min="CLASS_LEVEL.MIN" :max="CLASS_LEVEL.MAX" :value="level.currentLevel" :width="'70%'"
        @update="(value) => unitAbilitiesHandler.updateLevel(value)"></slider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { unitAbilitiesData, unitAbilitiesHandler } from '@/store/unit1/unitData';
import propComponent from '@/views/components/propComponent';
import { slider } from '@/views/components';

const CLASS_LEVEL = EUnit.CLASS_LEVEL;
const { level } = unitAbilitiesData;
const toLevel = (e: Event) => {
  const value = Number((<HTMLInputElement>e.target).value);
  let newValue = value;

  if (isNaN(value) || value < 1) {
    newValue = 1;
  } else if (value > 120) {
    newValue = 120;
  }
  unitAbilitiesHandler.updateLevel(newValue);
};
</script>

<style lang="scss" scoped>
@import "./unit-abilities-level.scss";
</style>