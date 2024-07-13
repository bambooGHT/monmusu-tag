<template>
  <div class="prop-info-box">
    <div class="info">
      <propComponent v-if="props" :icon-key="props.iconKey" :id="props.id" :name="props.name" :rarity="props.rarity"
        :key="props.id"></propComponent>
      <div class="name">{{ props?.name }}</div>
      <hr>
      <div>{{ props?.text || "null" }}</div>
      <div v-if="props?.unit" class="related-character">
        <unitFace @click="updateShowPropInfo" v-if="props.unitValue" :resource="props.unitValue.resource"
          :id="props.unitValue.id" :attr="props.unitValue.element || ''" :rarity="props.unitValue.rarityId || 82"
          :job="props.unitValue.classId || ''" :category="props.unit.category">
          <p>【{{ props.unitValue.nickname || 'なし' }}】</p>
          <p>{{ props.unitValue.charaName }}</p>
        </unitFace>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import propComponent from "../propComponent";
import unitFace from "../unitFace";
import { props, updateShowPropInfo } from "./propInfoPopup";
</script>

<style lang="scss" scoped>
@import "./propInfoPopup.scss";
</style>