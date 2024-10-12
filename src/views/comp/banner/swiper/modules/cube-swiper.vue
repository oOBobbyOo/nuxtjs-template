<script setup lang="ts">
const imgs = ref([
  {
    id: '1',
    url: 'https://swiperjs.com/demos/images/nature-1.jpg',
  },
  {
    id: '2',
    url: 'https://swiperjs.com/demos/images/nature-2.jpg',
  },
  {
    id: '3',
    url: 'https://swiperjs.com/demos/images/nature-3.jpg',
  },
  {
    id: '4',
    url: 'https://swiperjs.com/demos/images/nature-4.jpg',
  },
  {
    id: '5',
    url: 'https://swiperjs.com/demos/images/nature-5.jpg',
  },
  {
    id: '6',
    url: 'https://swiperjs.com/demos/images/nature-6.jpg',
  },
])
</script>

<template>
  <Swiper
    class="swiper-custom swiper-cube"
    :list="imgs"
    effect="cube"
    grab-cursor
    loop
    :cube-effect="{
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    }"
    :pagination="{
      clickable: true,
    }"
  >
    <template #default="{ url }">
      <img :src="url">
    </template>
  </Swiper>
</template>

<style scoped lang="less">
@import './custom.less';
</style>
