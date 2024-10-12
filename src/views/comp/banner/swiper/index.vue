<script setup lang="ts">
import DefaultSwiper from './modules/default-swiper.vue'
import PerviewSwiper from './modules/perview-swiper.vue'
import FadeSwiper from './modules/fade-swiper.vue'
import CubeSwiper from './modules/cube-swiper.vue'
import FlipSwiper from './modules/flip-swiper.vue'
import CardsSwiper from './modules/cards-swiper.vue'
import CoverflowSwiper from './modules/coverflow-swiper.vue'
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
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-4">
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
    </el-row>
  </div>
</template>

<style scoped lang="less">

</style>
