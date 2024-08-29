<script setup lang="ts">
defineOptions({ name: 'PinBallLoading' })

const themeColor = computed(() => {
  return isDark.value ? '#fff' : '#333'
})

const bgColor = computed(() => {
  return isDark.value ? '255, 255, 255' : '0, 0, 0'
})
</script>

<template>
  <div class="pinball-loading">
    <div class="ball-circle" />
    <div class="ball-circle" />
    <div class="ball-circle" />
    <div class="ball-shadow" />
    <div class="ball-shadow" />
    <div class="ball-shadow" />
    <span>Loading</span>
  </div>
</template>

<style scoped lang="less">
.pinball-loading {
  width: 200px;
  height: 150px;
  position: relative;

  span {
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 16px;
    letter-spacing: 12px;
    color: v-bind(themeColor);
  }

  .ball-circle {
    width: 20px;
    height: 20px;
    position: absolute;
    border-radius: 50%;
    background-color: v-bind(themeColor);
    ;
    left: 15%;
    transform-origin: 50%;
    animation: circle .5s alternate infinite ease;

    &:nth-child(2) {
      left: 45%;
      animation-delay: .2s;
    }

    &:nth-child(3) {
      left: auto;
      right: 15%;
      animation-delay: .3s;
    }
  }

  .ball-shadow {
    width: 20px;
    height: 4px;
    border-radius: 50%;
    background-color: rgba(v-bind(bgColor), .5);
    position: absolute;
    top: 62px;
    transform-origin: 50%;
    left: 15%;
    filter: blur(1px);
    animation: shadow .5s alternate infinite ease;

    &:nth-child(4) {
      left: 45%;
      animation-delay: .2s
    }

    &:nth-child(5) {
      left: auto;
      right: 15%;
      animation-delay: .3s;
    }
  }
}

@keyframes circle {
  0% {
    top: 60px;
    height: 5px;
    border-radius: 50px 50px 25px 25px;
    transform: scaleX(1.7);
  }

  40% {
    height: 20px;
    border-radius: 50%;
    transform: scaleX(1);
  }

  100% {
    top: 0;
  }
}

@keyframes shadow {
  0% {
    transform: scaleX(1.5);
  }

  40% {
    transform: scaleX(1);
    opacity: .7;
    opacity: .4;
  }

  100% {
    transform: scaleX(.2);
  }
}
</style>
