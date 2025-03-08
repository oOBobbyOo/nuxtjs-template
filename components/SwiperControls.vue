<script setup lang="ts">
const props = defineProps({
  swiper: Object as any,
})
</script>

<template>
  <button class="btn-control left-2" @click="props.swiper.prev()">
    <Icon name="material-symbols:arrow-back-ios-new" size="24" />
  </button>
  <button class="btn-control right-2" @click="props.swiper.next()">
    <Icon name="material-symbols:arrow-forward-ios" size="24" />
  </button>
</template>

<style scope lang="scss">
  .btn-control {
  --at-apply: absolute top-[50%] transform-translate-y-[50%] z-999999 flex-center px-2 py-2 rounded-full
    inline-block bg-gray-600[0.3] text-white cursor-pointer hover:bg-gray-600/[0.6];
}
</style>
