<template>
  <section class="abilities">
    <div class="abilities-left abilities-box" :class="{ 'abilities-box-content': unitAbilitiesData.awakenings }">
      <abilitiesInfo></abilitiesInfo>
      <abilitiesAwakenings v-if="unitAbilitiesData.awakenings"></abilitiesAwakenings>
      <enemyAssociationId v-if="unitDetailData.associationIds?.[1]"></enemyAssociationId>
    </div>
    <div class="abilities-right abilities-box">
      <mapAttrRevision v-if="unitAbilitiesData.entranceMap?.list[0]"></mapAttrRevision>
      <abilitiesLevel></abilitiesLevel>
      <abilitiesClassAndEquipment v-if="unitDetailData.equipments"></abilitiesClassAndEquipment>
      <attributes></attributes>
      <abilitiesTokenData v-if="unitDetailData.tokenData"></abilitiesTokenData>
      <abilitiesUniqueWeapon v-if="unitDetailData.uniqueWeapon"></abilitiesUniqueWeapon>
      <abilitiesText></abilitiesText>
    </div>
  </section>
</template>

<script setup lang="ts">
import abilitiesInfo from './abilitiesLeftComponents/info';
import abilitiesAwakenings from './abilitiesLeftComponents/awakenings';
import enemyAssociationId from './abilitiesLeftComponents/enemyAssociationId';
import abilitiesLevel from './abilitiesRightComponents/level';
import abilitiesClassAndEquipment from './abilitiesRightComponents/classAndEquipment';
import attributes from './abilitiesRightComponents/attributes';
import abilitiesText from "./abilitiesRightComponents/text";
import abilitiesUniqueWeapon from './abilitiesRightComponents/uniqueWeapon';
import abilitiesTokenData from './abilitiesRightComponents/tokenData';
import mapAttrRevision from './abilitiesRightComponents/mapAttrRevision';

import { unitAbilitiesData, unitDetailData } from '@/store/unit1/unitData';
</script>

<style lang="scss">
@import "./unit-abilities.scss";
</style>