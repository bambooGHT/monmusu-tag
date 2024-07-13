<template>
  <ul class="unit-class-and-eq">
    <li v-for="(p, index) of classPhase">
      <clickButton @click="unitAbilitiesHandler.updateEquipmentIndex(index)"
        :selected="unitAbilitiesData.equipmentIndex === index">
        equipment
      </clickButton>
      <div class="unit-class-and-eq-control">
        <span class="eq-tips eq-tip-hover" tabindex="-1" v-if="unitDetailData.equipments[index]">!
          <ul class="eq-tip">
            <li v-for="item of unitDetailData.equipments[index]">
              <propComponent :rarity="item.rarity" :text="item.text" :id="item.id" :icon-key="'equipment'">
                {{ item.name }}
              </propComponent>
              <div v-for="eqValue of eqAttrFilter(item)">
                <p><span>{{ eqValue[0] }}</span> <span>{{ eqValue[1] }}</span></p>
              </div>
            </li>
          </ul>
        </span>
        <p :class="{ 'class-select': unitAbilitiesData.classIndex === index + 1 && level.currentLevel === p }"
          @click="updateClassAndLevel(index + 1, p)">
          {{ p }}</p>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { updateClassAndLevel, eqAttrFilter, classPhase } from './unit-abilities-classAndEquipment';
import { unitAbilitiesData, unitDetailData, unitAbilitiesHandler } from '@/store/unit1/unitData';
import { clickButton } from '@/views/components';
import propComponent from '@/views/components/propComponent';
const { level } = unitAbilitiesData;


</script>

<style lang="scss" scoped>
@import "./unit-abilities-classAndEquipment.scss";
</style>