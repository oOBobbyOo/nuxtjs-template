<script setup lang="ts">
const swiper = useSwiper()
</script>

<template>
  <button class="btn-control left-0" @click="swiper.slidePrev()">
    <Icon name="material-symbols:arrow-back-ios" />
    <span sr-only>Previous</span>
  </button>
  <button class="btn-control right-0" @click="swiper.slideNext()">
    <Icon name="material-symbols:arrow-forward-ios" />
    <span sr-only>Next</span>
  </button>
</template>

<style scope lang="scss">
  .btn-control {
   --at-apply: absolute top-[50%] translate-y-[-50%] z-10 px-2 py-3 rounded inline-block bg-gray-600/[0.3] text-white cursor-pointer hover:bg-gray-600/[0.6] disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50
  }
</style>
