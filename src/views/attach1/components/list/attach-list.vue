<template>
  <section>
    <div class="attach-list-size">
      <p>SIZE:
        {{ !isFilter ? attach.list.length : `${attach.conditionFilterLength} / ${attach.list.length}` }}
      </p>
      <clickButton @click="isFilter = !isFilter" :selected="isFilter">condition filter</clickButton>
    </div>
    <article>
      <ul class="attach-list-text family-Meiryo">
        <li v-for="p of attach.list" v-show="!isFilter || p.condition" :class="{ current: attach.currentAttach === p }"
          @click="attach.updateAttach(p); updateAttachDisplay()">
          <p>{{ p.name }}</p>
          <p :class="p.text.length >= 30 ? 'size1' : 'size2'">
          <div>{{ p.text }}</div>
          </p>
          <img decoding="async" :src="Url(getIconAttach(p.rarity))">
        </li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </article>
  </section>
</template>

<script setup lang="ts">
import { getIconAttach } from '@/data';
import { Url } from '@/service';
import { attach } from '@/store/attach1';
import { clickButton } from '@/views/components';
import { isFilter } from '.';
import { updateAttachDisplay } from "../../attach-state";
</script>

<style lang="scss" scoped>
@import "./attach-list.scss";
</style>