<script setup lang="ts">
defineOptions({ name: 'MoveLoading' })

const themeColor = computed(() => {
  return isDark.value ? '#fff' : '#333'
})

const bgColor = computed(() => {
  return isDark.value ? '255, 255, 255' : '0, 0, 0'
})
</script>

<template>
  <div class="loading">
    <div class="loader">
      <div> L </div>
      <div> O </div>
      <div> A </div>
      <div> D </div>
      <div> I </div>
      <div> N </div>
      <div> G </div>
      <div />
      <div />
      <div />
    </div>
  </div>
</template>

<style scoped lang="less">
.loading {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;

  .loader,
  .loader div {
    position: absolute;
    height: 36px;
  }

  .loader {
    top: 76%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    user-select: none;
    cursor: default;
    width: 100%;
    max-width: 990px;
    overflow: visible;

    div {
      width: 30px;
      margin: 0 20px;
      opacity: 0;
      animation: move 2s linear infinite;
      transform: rotate(180deg);
      color: v-bind(themeColor);
      font-size: 2em;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -40px;
        width: 10px;
        height: 5px;
        border-radius: 100%;
        background: rgba(v-bind(bgColor), 0.1);
      }

      &:nth-child(8)::before,
      &:nth-child(9)::before,
      &:nth-child(10)::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 10px;
        height: 10px;
        border-radius: 100%;
      }

      &:nth-child(8)::before,
      &:nth-child(9)::before,
      &:nth-child(10)::before {
        background: v-bind(themeColor);
      }

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

      &:nth-child(8) {
        animation-delay: 1.4s;
      }

      &:nth-child(9) {
        animation-delay: 1.6s;
      }

      &:nth-child(10) {
        animation-delay: 1.8s;
      }
    }
  }
}

@keyframes move {
  0% {
    right: 0;
    opacity: 0;
  }

  35% {
    right: 41%;
  }

  35%,
  65% {
    transform: rotate(0);
    opacity: 1;
  }

  65% {
    right: 59%;
  }

  100% {
    right: 100%;
    transform: rotate(-180deg);
  }
}
</style>
