<template>
  <section class="picturebook family-Meiryo">
    <div style="width: 100%;">
      <skeleton class="title" style="width: 190px;" animation></skeleton>
    </div>
    <article class="skin-template" v-if="unitDetailData.unitType === 'character'">
      <skeleton class="name" style="width: 40px;" animation></skeleton>
      <ul style="display: flex;">
        <div class="unit" v-for="index of 3">
          <skeleton animation></skeleton>
        </div>
      </ul>
      <skeleton class="name" style="width: 105px;" animation></skeleton>
      <skeleton style="margin-bottom: 2px; width: 70%;" v-for="index of 3" animation></skeleton>
      <br />
    </article>
    <article class="picturebook-template">
      <skeleton v-if="unitDetailData.unitType !== 'enemy'" style="width: 190px;" animation></skeleton>
      <skeleton style="width: 150px;" animation></skeleton>
      <skeleton style="margin-bottom: 1.5px; width: 90px;" animation></skeleton>
      <br />
      <skeleton :style="{ 'margin-bottom': index === 5 ? '0' : '2px' }" style=" width: 70%;" v-for="index of 5"
        animation></skeleton>
    </article>
  </section>
</template>

<script setup lang="ts">
import { unitDetailData } from '@/store/unit1/unitData';
import skeleton from '@/views/components/skeleton';
</script>

<style lang="scss" scoped>
@import "./unit-info.scss";
</style>