<template>
  <section class="uniqueWeapon">
    <div>
      <clickButton class="family-Roboto" :title="uwList[0].name" :width="'min-content'" @click="updateUniqueWeapon"
        :selected="uniqueWeaponApply">
        <propComponent :id="uwList[0].uw_id" :icon-key="'uniqueWeapon'" :rarity="1397969457">
          {{ uwList[0].name }}
        </propComponent>
      </clickButton>
      <div class="uw-index">
        <span class="cutover" @click="updateIndex('prev')">◁</span>
        <span>{{ unitAbilitiesData.uwIndex }}</span>
        <span class="cutover" @click="updateIndex('next')">▷</span>
      </div>
    </div>

    <div class="uniqueWeapon-info">
      <p>
        <template v-for="p of <(keyof typeof UniqueWeaponAttributeKeys)[]>Object.keys(UniqueWeaponAttributeKeys)">
          <span v-if="currentUW[p] !== 0">
            {{ UniqueWeaponAttributeKeys[p] }} +{{ currentUW[p] }}
          </span>
        </template>
      </p>
      <p>{{ uwAbility.text }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import propComponent from '@/views/components/propComponent';
import { clickButton } from '@/views/components';
import { unitDetailData, unitAbilitiesHandler, unitAbilitiesData } from '@/store/unit1/unitData';
import { UniqueWeaponAttributeKeys } from '@/data/calc/enums';
import { computed, ref } from 'vue';

const { uniqueWeapon: { list: uwList, ability: uwAbility } } = unitDetailData;
const uniqueWeaponApply = ref(false);
const updateUniqueWeapon = () => {
  uniqueWeaponApply.value = !uniqueWeaponApply.value;
  unitAbilitiesHandler.updateUniqueWeapon(uniqueWeaponApply.value);
};
const currentUW = computed(() => {
  return uwList[unitAbilitiesData.uwIndex];
});

const updateIndex = (value: "prev" | "next") => {
  let index = unitAbilitiesData.uwIndex + (value === "prev" ? -1 : 1);

  if (index < 0) index = EUnit.UNIQUEWEAPON_LEVEL.MAX;
  if (index > EUnit.UNIQUEWEAPON_LEVEL.MAX) index = EUnit.UNIQUEWEAPON_LEVEL.MIN;

  unitAbilitiesHandler.updateUwIndex(index);
};
</script>

<style lang="scss" scoped>
@import "./unit-abilities-uniqueWeapon.scss";
</style>