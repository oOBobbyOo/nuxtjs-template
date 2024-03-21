<script setup lang="ts">
// @see https://swiperjs.com/vue
import type { SwiperOptions } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/vue'
import {
  Autoplay,
  EffectCards,
  EffectFade,
  EffectFlip,
  Navigation,
  Pagination,
} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-cards'
import 'swiper/css/effect-fade'
import 'swiper/css/effect-flip'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

defineOptions({ name: 'Swiper' })

withDefaults(defineProps<SwiperProps>(), {
  autoplay: true,
  direction: 'horizontal',
  effect: 'slide',
  grabCursor: true,
  loop: true,
  navigation: true,
  pagination: true,
  slidesPerView: 1,
  spaceBetween: 0,
})

interface SwiperProps extends SwiperOptions {
  list: any[]
}

const modules = [Autoplay, EffectCards, EffectFade, EffectFlip, Navigation, Pagination]

const attrs = useAttrs()
</script>

<template>
  <Swiper
    :autoplay="autoplay"
    :direction="direction"
    :effect="effect"
    :grab-cursor="grabCursor"
    :loop="loop"
    :navigation="navigation"
    :pagination="pagination"
    :slides-per-view="slidesPerView"
    :space-between="spaceBetween"
    :modules="modules"
    v-bind="attrs"
  >
    <SwiperSlide v-for="item in list" :key="item.id">
      <slot v-bind="item" />
    </SwiperSlide>
  </Swiper>
</template>

<style scoped lang="less">
.swiper {
  width: 100%;
  height: 100%;
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
