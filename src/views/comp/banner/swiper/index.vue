<script setup lang="ts">
import DefaultSwiper from './modules/default-swiper.vue'
import PerviewSwiper from './modules/perview-swiper.vue'
import FadeSwiper from './modules/fade-swiper.vue'
import FlipSwiper from './modules/flip-swiper.vue'
import CardsSwiper from './modules/cards-swiper.vue'
</script>

<template>
  <div class="space-y-5">
    <div>
      <h2 mb-2 text-xl>
        Default
      </h2>
      <DefaultSwiper class="!h-50" />
    </div>

    <div>
      <h2 mb-2 text-xl>
        Slides per view
      </h2>
      <PerviewSwiper class="!h-50" />
    </div>

    <div>
      <h2 mb-2 text-xl>
        Effect fade
      </h2>
      <FadeSwiper class="!h-50" />
    </div>

    <div>
      <h2 mb-2 text-xl>
        Effect flip
      </h2>
      <FlipSwiper />
    </div>

    <div>
      <h2 mb-2 text-xl>
        Effect cards
      </h2>
      <CardsSwiper class="!h-80 !w-60" />
    </div>
  </div>
</template>

<style scoped lang="less">

</style>
