<script setup lang="ts">
defineOptions({ name: 'MoveOutLoading' })
</script>

<template>
  <div class="loading">
    <div>G</div>
    <div>N</div>
    <div>I</div>
    <div>D</div>
    <div>A</div>
    <div>O</div>
    <div>L</div>
  </div>
</template>

<style scoped lang="less">
.loading {
  width: 600px;
  height: 36px;
  overflow: visible;
  user-select: none;
  cursor: default;
  position: relative;

  div {
    position: absolute;
    width: 20px;
    height: 36px;
    opacity: 0;
    font-family: Helvetica, Arial, sans-serif;
    animation: move 2s linear infinite;
    transform: rotate(180deg);
    color: #35c4f0;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }

    &:nth-child(4) {
      animation-delay: 0.6s;
    }

    &:nth-child(5) {
      animation-delay: 0.8s;
    }

    &:nth-child(6) {
      animation-delay: 1s;
    }

    &:nth-child(7) {
      animation-delay: 1.2s;
    }
  }
}

@keyframes move {
  0% {
    left: 0;
    opacity: 0;
  }

  35% {
    left: 41%;
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }

  65% {
    left: 59%;
    transform: rotate(0deg);
    opacity: 1;
  }

  100% {
    left: 100%;
    transform: rotate(-180deg);
    opacity: 0;
  }
}
</style>
