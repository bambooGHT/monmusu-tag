<template>
  <headPicture></headPicture>
  <section class="home">
    <announce></announce>
    <twitter></twitter>
    <news></news>
    <characterCarousel></characterCarousel>
  </section>
</template>

<script setup lang="ts">
import characterCarousel from './components/characterCarousel';
import headPicture from './components/headPicture';
import announce from './components/announce';
import twitter from './components/twitter';
import news from './components/news';
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  width: 100%;

  :deep(>*) {
    margin: 10px 0;
  }
}
</style>