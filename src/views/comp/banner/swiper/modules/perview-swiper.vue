<script setup lang="ts">
const list = ref([
  {
    id: '1',
    content: 'Slide 1',
  },
  {
    id: '2',
    content: 'Slide 2',
  },
  {
    id: '3',
    content: 'Slide 3',
  },
  {
    id: '4',
    content: 'Slide 4',
  },
  {
    id: '5',
    content: 'Slide 5',
  },
  {
    id: '6',
    content: 'Slide 6',
  },
  {
    id: '7',
    content: 'Slide 7',
  },
  {
    id: '8',
    content: 'Slide 8',
  },
  {
    id: '9',
    content: 'Slide 9',
  },
  {
    id: '10',
    content: 'Slide 10',
  },
])
</script>

<template>
  <Swiper
    class="swiper-custom"
    :list="list"
    :slides-per-view="3"
    :space-between="30"
    :pagination="{
      clickable: true,
    }"
  >
    <template #default="{ content }">
      <p class="text-dark">
        {{ content }}
      </p>
    </template>
  </Swiper>
</template>

<style scoped lang="less">
@import './custom.less';
</style>
