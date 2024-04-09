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
  <div class="space-y-5">
    <div>
      <h2 mb-2 text-xl>
        Default
      </h2>
      <div class="h-[200px]">
        <Swiper
          class="swiper-custom"
          :list="list"
          :autoplay="{
            delay: 1000,
            disableOnInteraction: false,
          }"
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
      </div>
    </div>

    <div>
      <h2 mb-2 text-xl>
        Slides per view
      </h2>
      <div class="h-[200px]">
        <Swiper class="swiper-custom" :list="list" :slides-per-view="3" :space-between="30">
          <template #default="{ content }">
            <p class="text-dark">
              {{ content }}
            </p>
          </template>
        </Swiper>
      </div>
    </div>

    <div>
      <h2 mb-2 text-xl>
        Effect fade
      </h2>
      <div class="h-[200px]">
        <Swiper class="swiper-custom" :list="list" effect="fade">
          <template #default="{ content }">
            <p class="text-dark">
              {{ content }}
            </p>
          </template>
        </Swiper>
      </div>
    </div>

    <div>
      <h2 mb-2 text-xl>
        Effect flip
      </h2>
      <Swiper :list="imgs" effect="flip" class="swiper-custom swiper-flip">
        <template #default="{ url }">
          <img :src="url">
        </template>
      </Swiper>
    </div>

    <div>
      <h2 mb-2 text-xl>
        Effect cards
      </h2>
      <Swiper
        :list="list"
        effect="cards"
        :navigation="false"
        :pagination="false"
        class="swiper-cards"
      >
        <template #default="{ content }">
          {{ content }}
        </template>
      </Swiper>
    </div>
  </div>
</template>

<style scoped lang="less">
.swiper-custom {
  ::v-deep(.swiper-button-prev),
  ::v-deep(.swiper-button-next) {
    width: 36px;
    height: 36px;
    background: rgb(31 45 61 / 11%);
    border-radius: 50%;
  }

  ::v-deep(.swiper-button-prev:hover),
  ::v-deep(.swiper-button-prev:focus),
  ::v-deep(.swiper-button-next:hover),
  ::v-deep(.swiper-button-next:focus) {
    background: rgb(31 45 61 / 23%);
  }

  ::v-deep(.swiper-button-prev::after),
  ::v-deep(.swiper-button-next::after) {
    font-size: inherit;
    color: #fff;
  }

  ::v-deep(.swiper-pagination) {
    &-bullet {
      width: 16px;
      height: 3px;
      background: rgb(0 0 0 / 48%);
      border-radius: 0;

      &-active {
        width: 24px;
        background: rgb(100 108 255 / 88%);
      }
    }
  }
}

.swiper-flip {
  width: 300px;
  height: 300px;
}

.swiper-cards {
  width: 240px;
  height: 320px;

  ::v-deep(.swiper-slide) {
    border-radius: 18px;
  }

  ::v-deep(.swiper-slide:nth-child(1n)) {
    background-color: rgb(206 17 17);
  }

  ::v-deep(.swiper-slide:nth-child(2n)) {
    background-color: rgb(0 140 255);
  }

  ::v-deep(.swiper-slide:nth-child(3n)) {
    background-color: rgb(10 184 111);
  }

  ::v-deep(.swiper-slide:nth-child(4n)) {
    background-color: rgb(211 122 7);
  }

  ::v-deep(.swiper-slide:nth-child(5n)) {
    background-color: rgb(118 163 12);
  }

  ::v-deep(.swiper-slide:nth-child(6n)) {
    background-color: rgb(180 10 47);
  }

  ::v-deep(.swiper-slide:nth-child(7n)) {
    background-color: rgb(35 99 19);
  }

  ::v-deep(.swiper-slide:nth-child(8n)) {
    background-color: rgb(0 68 255);
  }

  ::v-deep(.swiper-slide:nth-child(9n)) {
    background-color: rgb(218 12 218);
  }

  ::v-deep(.swiper-slide:nth-child(10n)) {
    background-color: rgb(54 94 77);
  }
}
</style>
