<template>
  <main id="main">
    <TransitionGroup name="list" tag="ul">
      <li v-for="(item, index) of message.messageArray.value" :key="item.key"
        class="main-message" :class="`message-${item.type}`">
        {{ item.message }}
        <div @click="message.removeIndex(index)" class="message-x"></div>
      </li>
    </TransitionGroup>
  </main>
</template>

<script setup lang="ts">
import { message } from './message';
</script>

<style lang="scss" scoped>
@import "./message.scss";
</style>