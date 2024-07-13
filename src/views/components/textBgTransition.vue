<template>
  <p class="family-Roboto">
    <span>
      <slot></slot>
    </span>
  </p>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
p {
  position: relative;
  margin: 5px 0;
  padding-left: 5px;
  padding-right: 23px;
  width: max-content;
  height: 25px;
  line-height: 25px;
  font-size: clamp(1.4rem, 1.5vw, 1.6rem);
  letter-spacing: 1px;

  span {
    display: block;
    overflow: hidden;
    width: 0%;
  color: var(--text-color-2);
    white-space: nowrap;
    animation: background-transition .5s forwards .1s;
  }

  &::before,
  &::after {
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    width: 0%;
    height: 100%;
    content: '';
  }

  &::before {
    z-index: -1;
    background: linear-gradient(-45deg, transparent 17px, var(--color-bg-tran) 0%);
    animation: background-transition .6s forwards;
  }

  &::after {
    z-index: -2;
    background: linear-gradient(-45deg, transparent 17px, var(--color-bg-tran) 0%);
    opacity: 0.5;
    animation: background-transition1 .5s forwards .1s;
  }
}

@keyframes background-transition {
  0% {
    width: 0%;
  }

  100% {
    width: 100%;
  }
}

@keyframes background-transition1 {
  0% {
    width: 0%;
  }

  100% {
    width: calc(100% + 13px);
  }
}
</style>