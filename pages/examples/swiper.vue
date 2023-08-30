<script setup lang="ts">
const slides = ref(Array.from({ length: 10 }, () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  const contrast = r * 0.299 + g * 0.587 + b * 0.114 > 186 ? 'black' : 'white'
  return { bg: `rgb(${r}, ${g}, ${b})`, color: contrast }
}))
</script>

<template>
  <div class="relative m-auto max-w-[60%]">
    <h2 my-4 text-3xl>
      Swiper Creative Effect
    </h2>
    <Swiper
      :height="300"
      :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperPagination]"
      :slides-per-view="1"
      :loop="true"
      effect="creative"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }"
      :pagination="true"
      :creative-effect="{
        prev: {
          shadow: false,
          translate: ['-20%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }"
    >
      <SwiperSlide
        v-for="(slide, idx) in slides"
        :key="idx"
        :style="`background-color: ${slide.bg}; color: ${slide.color}`"
      >
        {{ idx }}
      </SwiperSlide>
      <!-- useSwiper() within a swiper instance -->
      <SwiperControls />
    </Swiper>

    <h2 my-4 text-3xl>
      Swiper Card Effect
    </h2>
    <Swiper
      class="swiper-cards"
      :width="240"
      :modules="[SwiperAutoplay, SwiperEffectCards]"
      :slides-per-view="1"
      :loop="true"
      effect="cards"
      :grab-cursor="true"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }"
    >
      <SwiperSlide
        v-for="(slide, idx) in slides"
        :key="idx"
        :style="`background-color: ${slide.bg}; color: ${slide.color}`"
      >
        {{ idx }}
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped lang="scss">
.swiper {
  position: relative;
  .swiper-slide {
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-size: 4rem;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
  }
  &.swiper-cards {
    width: 240px;
    .swiper-slide {
      height: 240px;
      border-radius: 6px;
      border: 1px solid black;
    }
  }
}
</style>
