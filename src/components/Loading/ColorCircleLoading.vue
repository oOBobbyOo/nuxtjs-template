<script setup lang="ts">
import { useThemeStore } from '@/stores/modules/theme'

defineOptions({ name: 'ColorCircleLoading' })

const themeStore = useThemeStore()
const themeColor = computed(() => themeStore.themeColor)
</script>

<template>
  <div class="loader">
    <span>Loading...</span>
  </div>
</template>

<style scoped lang="less">
.loader {
  width: 10em;
  height: 10em;
  font-size: 24px;
  box-sizing: border-box;
  border-top: 0.3em solid hotpink;
  border-radius: 50%;
  position: relative;
  animation: rotating 2s linear infinite;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    box-sizing: border-box;
    top: -0.2em;
  }

  &::before {
    border-top: 0.3em solid dodgerblue;
    transform: rotate(120deg);
  }

  &::after {
    border-top: 0.3em solid gold;
    transform: rotate(240deg);
  }

  span {
    position: absolute;
    color: v-bind(themeColor);
    width: inherit;
    height: inherit;
    text-align: center;
    line-height: 10em;
    font-family: sans-serif;
    animation: rotating 2s ease-in-out infinite reverse;
  }

  @keyframes rotating {
    33% {
      transform: rotate(0.33turn);
    }

    66% {
      transform: rotate(0.66turn);
    }

    100% {
      transform: rotate(1turn);
    }
  }
}
</style>
