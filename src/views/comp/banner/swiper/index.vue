<script setup lang="ts">
import DefaultSwiper from './modules/default-swiper.vue'
import PerviewSwiper from './modules/perview-swiper.vue'
import FadeSwiper from './modules/fade-swiper.vue'
import CubeSwiper from './modules/cube-swiper.vue'
import FlipSwiper from './modules/flip-swiper.vue'
import CardsSwiper from './modules/cards-swiper.vue'
import CoverflowSwiper from './modules/coverflow-swiper.vue'
import ThumbsSwiper from './modules/thumbs-swiper.vue'
import CreativeSwiper from './modules/creative-swiper.vue'
import VisualSwiper from './modules/visual-swiper.vue'

const creativeEffectOptions = ref([
  {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      translate: ['100%', 0, 0],
    },
  },
  {
    prev: {
      shadow: true,
      translate: ['-120%', 0, -500],
    },
    next: {
      shadow: true,
      translate: ['120%', 0, -500],
    },
  },
  {
    prev: {
      shadow: true,
      translate: ['-20%', 0, -1],
    },
    next: {
      translate: ['100%', 0, 0],
    },
  },
  {
    prev: {
      shadow: true,
      translate: [0, 0, -800],
      rotate: [180, 0, 0],
    },
    next: {
      shadow: true,
      translate: [0, 0, -800],
      rotate: [-180, 0, 0],
    },
  },
  {
    prev: {
      shadow: true,
      translate: ['-125%', 0, -800],
      rotate: [0, 0, -90],
    },
    next: {
      shadow: true,
      translate: ['125%', 0, -800],
      rotate: [0, 0, 90],
    },
  },
  {
    prev: {
      shadow: true,
      origin: 'left center',
      translate: ['-5%', 0, -200],
      rotate: [0, 100, 0],
    },
    next: {
      origin: 'right center',
      translate: ['5%', 0, -200],
      rotate: [0, -100, 0],
    },
  },
])
</script>

<template>
  <div class="space-y-4">
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mb-4">
        <Card title="Default">
          <DefaultSwiper class="!h-80" />
        </Card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mb-4">
        <Card title="Slides per view">
          <PerviewSwiper class="bg-gray-1 !h-80" />
        </Card>
      </el-col>
      <el-col :span="24" class="mb-4">
        <Card title="Effect fade">
          <FadeSwiper class="!h-80" />
        </Card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-4">
        <Card title="Effect cube">
          <CubeSwiper class="!h-80 !w-80" />
        </Card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-4">
        <Card title="Effect flip">
          <FlipSwiper class="!h-80 !w-80" />
        </Card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-4">
        <Card title="Effect cards">
          <CardsSwiper class="!h-80 !w-60" />
        </Card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-4">
        <Card title="Effect coverflow">
          <CoverflowSwiper />
        </Card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-4">
        <Card title="Thumbs">
          <ThumbsSwiper />
        </Card>
      </el-col>
      <el-col :span="24" class="mb-4">
        <Card title="Creative">
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
            <CreativeSwiper v-for="(option, i) in creativeEffectOptions" :key="i" :creative-effect="option" />
          </div>
        </Card>
      </el-col>
      <el-col :span="24" class="mb-4">
        <Card title="Visual">
          <VisualSwiper />
        </Card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="less">

</style>
