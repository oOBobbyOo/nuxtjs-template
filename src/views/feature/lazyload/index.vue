<script setup lang="ts">
import { getRandomImg } from '@/utils'

function onCallback(el: HTMLImageElement) {
  el.style.opacity = '1'
  el.style.display = 'block'
}
</script>

<template>
  <Card title="懒加载">
    <div class="mb-4">
      图片懒加载核心就是判断当前图片是否到了可视区域，基于 IntersectionObserver API来实现了图片的懒加载
    </div>

    <div class="grid gap-4" :style="{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }">
      <div v-for="i in 32" :key="i" class="lazy-img-container">
        <img
          v-lazyLoad="{
            src: getRandomImg(),
            callback: onCallback,
          }" class="lazy-img h-[250px] w-full cursor-pointer place-items-center rounded-md object-cover"
        >
      </div>
    </div>
  </Card>
</template>

<style scoped lang="less">
.lazy-img-container {
  position: relative;

  .lazy-img {
    opacity: 0;
    transition: opacity 2s;
  }
}
</style>
