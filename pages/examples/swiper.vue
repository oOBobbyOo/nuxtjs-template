<script setup lang="ts">
const slides = ref(Array.from({ length: 10 }, (_, idx) => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  const contrast = r * 0.299 + g * 0.587 + b * 0.114 > 186 ? 'black' : 'white'
  return { id: idx + 1, bg: `rgb(${r}, ${g}, ${b})`, color: contrast }
}))

const swiperBasicRef = ref(null)
const swiperCreativeRef = ref(null)

const swiperBasic = useSwiper(swiperBasicRef)

useSwiper(swiperCreativeRef, {
  effect: 'creative',
  autoplay: {
    delay: 8000,
    disableOnInteraction: true,
  },
  creativeEffect: {
    prev: {
      translate: ['-125%', 0, -800],
      rotate: [0, 0, -90],
    },
    next: {
      translate: ['125%', 0, -800],
      rotate: [0, 0, 90],
    },
  },
})
</script>

<template>
  <div class="relative m-auto md:max-w-[60%]">
    <div class="swiper-wrapper">
      <h2 my-4 text-3xl>Basic</h2>
      <div class="swiper-inner">
        <ClientOnly>
          <swiper-container class="swiper-basic">
            <swiper-slide v-for="slide in slides" :key="`slide-basic-${slide.id}`" class="swiper-slide"
              :style="`background-color: ${slide.bg}; color: ${slide.color};`">
              {{ slide.id }}
            </swiper-slide>
          </swiper-container>
        </ClientOnly>
      </div>
    </div>

    <div class="swiper-wrapper">
      <h2 my-4 text-3xl>Basic w/ Slots & Custom Navigation</h2>
      <div class="swiper-inner">
        <ClientOnly>
          <swiper-container ref="swiperBasicRef" class="swiper-basic" :loop="true">
            <div slot="container-start">
              Slot component before wrapper
            </div>
            <div slot="container-end">
              Slot component after wrapper
            </div>
            <swiper-slide v-for="slide in slides" :key="`slide-basic-${slide.id}`" class="swiper-slide"
              :style="`background-color: ${slide.bg}; color: ${slide.color};`">
              {{ slide.id }}
            </swiper-slide>
          </swiper-container>

          <SwiperControls :swiper="swiperBasic" />
        </ClientOnly>
      </div>
    </div>

    <div class="swiper-wrapper">
      <h2 my-4 text-3xl>
        Creative Effect
      </h2>
      <div class="swiper-inner">
        <ClientOnly>
          <swiper-container ref="swiperCreativeRef" class="swiper-creative" :loop="true" :init="false">
            <swiper-slide v-for="slide in slides" :key="`slide-creative-${slide.id}`" class="swiper-slide"
              :style="`background-color: ${slide.bg}; color: ${slide.color};`">
              {{ slide.id }}
            </swiper-slide>
          </swiper-container>
        </ClientOnly>
      </div>
    </div>

    <div class="swiper-wrapper">
      <h2 my-4 text-3xl>
        Card Effect
      </h2>
      <div class="swiper-inner">
        <ClientOnly>
          <swiper-container class="swiper-cards" :width="240" :slides-per-view="1" :loop="true" effect="cards"
            :autoplay="{
              delay: 8000,
              disableOnInteraction: true,
            }">
            <swiper-slide v-for="slide in slides" :key="`slide-card-${slide.id}`" class="swiper-slide"
              :style="`background-color: ${slide.bg}; color: ${slide.color};`">
              {{ slide.id }}
            </swiper-slide>
          </swiper-container>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.swiper-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    height: 20vh;
    font-size: 4rem;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
  }

  .swiper-cards {
    width: 240px;
    height: 240px;

    .swiper-slide {
      height: 100%;
      border-radius: 6px;
    }
  }
}
</style>
