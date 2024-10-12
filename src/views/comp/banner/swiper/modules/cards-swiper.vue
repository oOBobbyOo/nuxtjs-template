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
    class="swiper-custom swiper-cards" :list="list" effect="cards" grab-cursor loop :navigation="false"
    :pagination="false"
  >
    <template #default="{ content }">
      {{ content }}
    </template>
  </Swiper>
</template>

<style scoped lang="less">
@import './custom.less';

.swiper-cards {
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
