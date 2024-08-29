<script setup lang="ts">
defineOptions({ name: 'BattleLoading' })

const themeColor = computed(() => {
  return isDark.value ? '#fff' : '#333'
})
</script>

<template>
  <div class="battle-loading">
    <p><i /><i /><i /></p>
  </div>
</template>

<style scoped lang="less">
.battle-loading {
  width: 200px;
  height: 200px;
  position: relative;

  p {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 50px;
    height: 50px;
    animation: ro1 8s linear infinite;
  }

  i {
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 50px;

    &:after {
      content: '';
      position: absolute;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border-left: 5px solid v-bind(themeColor);
      animation: ro2 1s linear infinite;
    }

    &:nth-child(1) {
      transform: rotate(0deg);
    }

    &:nth-child(2) {
      transform: rotate(120deg);
    }

    &:nth-child(3) {
      transform: rotate(240deg);
    }
  }
}

@keyframes ro1 {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes ro2 {
  0% {
    transform: skewX(60deg) rotate(0deg);
  }

  100% {
    transform: skewX(60deg) rotate(360deg);
  }
}
</style>
