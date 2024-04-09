<script setup lang="ts"></script>

<template>
  <div class="absolute-center flex-col">
    <div class="loader" />
  </div>
</template>

<style scoped lang="less">
.loader {
  position: relative;
  width: 48px;
  height: 48px;
  margin: auto;

  &::before {
    position: absolute;
    top: 60px;
    left: 0;
    width: 48px;
    height: 5px;
    content: '';
    background: #999;
    border-radius: 50%;
    animation: loader-before 0.5s linear infinite;
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background: rgb(61 106 255);
    border-radius: 4px;
    animation: loader-after 0.5s linear infinite;
  }
}

@keyframes loader-before {
  0%,
  100% {
    transform: scale(1, 1);
  }

  50% {
    transform: scale(1.2, 1);
  }
}

@keyframes loader-after {
  15% {
    border-bottom-right-radius: 3px;
  }

  25% {
    transform: translateY(9px) rotate(22.5deg);
  }

  50% {
    border-bottom-right-radius: 40px;
    transform: translateY(18px) scale(1, 0.9) rotate(45deg);
  }

  75% {
    transform: translateY(9px) rotate(67.5deg);
  }

  100% {
    transform: translateY(0) rotate(90deg);
  }
}
</style>
