<script setup lang="ts">
import { getRandomImg } from '@/utils'

const randomImgs = getRandomImg(8) as string[]

const imgs = computed(() => randomImgs.map((item, i) => ({ id: i, url: item })))
</script>

<template>
  <Swiper
    class="swiper-custom swiper-coverflow"
    :list="imgs"
    effect="coverflow"
    grab-cursor
    loop
    centered-slides
    slides-per-view="auto"
    :coverflow-effect="{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }"
    :pagination="{
      clickable: true,
    }"
  >
    <template #default="{ url }">
      <img :src="url" class="h-full w-full object-cover">
    </template>
  </Swiper>
</template>

<style scoped lang="less">
@import './custom.less';

.swiper-coverflow {
  ::v-deep(.swiper-slide) {
    width: 320px;
    height: 320px;
  }
}
</style>
