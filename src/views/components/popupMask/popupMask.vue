<template>
  <section class="mask" :class="{ 'mask-show': state.show, 'mask-bg': state.mask }" :style="state.style"
    @click="popupMask.clearPopup()">
  </section>
</template>

<script setup lang="ts">
import { state, popupMask } from "./popupMask";
</script>


<style lang="scss">
@import "./popupMask.css";
</style>