<script setup lang="ts">
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { getRandomImg } from '@/utils'

const imgs = getRandomImg(20) as string[]

const thumbsSwiper = ref<SwiperClass | null>(null)

function setThumbsSwiper(swiper: SwiperClass) {
  thumbsSwiper.value = swiper
}
</script>

<template>
  <div class="h-80">
    <Swiper
      class="swiper-custom h-4/5 w-full"
      loop
      navigation
      :space-between="10"
      :modules="[FreeMode, Navigation, Thumbs]"
      :thumbs="{ swiper: thumbsSwiper }"
    >
      <SwiperSlide v-for="i in 20" :key="i">
        <img :src="imgs[i - 1]" class="h-full w-full object-cover">
      </SwiperSlide>
    </Swiper>
    <!-- 缩略图 -->
    <Swiper
      class="swiper-thumbs h-1/5 !pt-2.5"
      loop
      free-mode
      watch-slides-progress
      :space-between="10"
      :slides-per-view="5"
      :modules="[FreeMode, Navigation, Thumbs]"
      @swiper="setThumbsSwiper"
    >
      <SwiperSlide v-for="i in 20" :key="i">
        <img :src="imgs[i - 1]" class="h-full w-full object-cover">
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped lang="less">
@import './custom.less';

.swiper-thumbs {
  .swiper-slide {
    height: 100%;
    opacity: 0.4;
  }

  .swiper-slide-thumb-active {
    opacity: 1;
  }
}
</style>
