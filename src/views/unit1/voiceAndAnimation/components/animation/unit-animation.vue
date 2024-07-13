<template>
  <ul class="animation-list list-style">
    <div>
      <slot></slot>
    </div>
    <template v-if="monmusuSpine.data.spineAnimations[0]">
      <li v-for="p of monmusuSpine.data.spineAnimations" @click="monmusuSpine.toggleAnimation(p.name)">
        <clickButton :selected="p.name === monmusuSpine.data.currentAnimation">{{ p.name }}</clickButton>
      </li>
    </template>
    <div v-else style="margin: 0 auto;">NULL</div>
  </ul>
</template>

<script setup lang="ts">
import { clickButton } from "@/views/components";
import { monmusuSpine } from '@/store/unit1/unitData';
</script>