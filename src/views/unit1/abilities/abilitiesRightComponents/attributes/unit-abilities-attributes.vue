<template>
  <ul class="ability-attr" v-if="unitAbilitiesData.attributes">
    <li v-for="(value, key) of unitAbilitiesData.attributes">
      <abbr v-if="AttributeName[key]" class="ability-key" :title="AttributeName[key]">
        {{ key }}:</abbr>
      <span v-else class="ability-key">{{ key }}:</span>
      <span class="ability-value">{{ value }}</span>
    </li>
  </ul>
  <template v-if="unitAbilitiesData.resistance">
    <p class="text-title family-Roboto">
      resistance
    </p>
    <ul class="ability-attr ability-attr2">
      <li v-for="(p) of unitAbilitiesData.resistance">
        <span class="ability-key">{{ p.name }}:</span>
        <span>{{ p.value }}</span>
      </li>
    </ul>
  </template>
</template>

<script setup lang="ts">
import { unitAbilitiesData } from '@/store/unit1/unitData';
import { AttributeName } from '@/data/calc/enums';
</script>

<style lang="scss" scoped>
@import "./unit-abilities-attributes.scss";
</style>