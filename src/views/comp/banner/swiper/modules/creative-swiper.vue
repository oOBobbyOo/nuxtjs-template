<script setup lang="ts">
import 'swiper/css/effect-creative'
import 'swiper/css/pagination'

import { EffectCreative, Pagination } from 'swiper/modules'
import type { CreativeEffectOptions } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { getRandomImg } from '@/utils'

defineProps<{
  creativeEffect: CreativeEffectOptions
}>()

const imgs = getRandomImg(8) as string[]
</script>

<template>
  <Swiper
    effect="creative"
    centered-slides
    loop
    grab-cursor
    :creative-effect="creativeEffect"
    :pagination="{
      clickable: true,
    }"
    :modules="[EffectCreative, Pagination]"
    class="h-60 max-w-80 w-full"
  >
    <SwiperSlide v-for="i in 8" :key="i">
      <img :src="imgs[i - 1]" class="h-full w-full object-cover">
    </SwiperSlide>
  </Swiper>
</template>
