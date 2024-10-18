<script setup lang="ts">
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'

import { random, times } from 'lodash-es'
import { nanoid } from 'nanoid'
import errorImg from '@/assets/common/error.png'
import loadingImg from '@/assets/common/loading.png'

import { getRandomImg } from '@/utils'

const getList = (pageSize = 10) => times(pageSize, () => ({ id: nanoid(), url: getRandomImg() }))

const list = ref(getList(50))

const loading = ref(true)

const options = reactive({
  // 唯一key值
  rowKey: 'id',
  // 卡片之间的间隙
  gutter: 15,
  // 是否有周围的gutter
  hasAroundGutter: true,
  // 卡片在PC上的宽度
  width: 320,
  // 自定义行显示个数，主要用于对移动端的适配
  breakpoints: {
    1200: {
      // 当屏幕宽度小于等于1200
      rowPerView: 4,
    },
    800: {
      // 当屏幕宽度小于等于800
      rowPerView: 3,
    },
    500: {
      // 当屏幕宽度小于等于500
      rowPerView: 2,
    },
  },
  // 动画前缀
  animationPrefix: 'animate__animated',
  // 动画效果, 卡片入场动画，默认只有 fadeIn，引入 animation.css 后可使用其他动画
  animationEffect: 'fadeIn',
  // 动画时间
  animationDuration: 1000,
  // 动画延迟
  animationDelay: 300,
  // 背景色
  backgroundColor: '#fff',
  // imgSelector
  imgSelector: 'src.original',
  // 加载配置
  loadProps: {
    loading: loadingImg,
    error: errorImg,
    ratioCalculator: () => {
      // 设置最小宽高比
      const minRatio = random(3, 4, true)
      const maxRatio = random(3, 4, true)
      return minRatio / maxRatio
    },
  },
  // 是否懒加载
  lazyload: true,
  // 图片加载是否开启跨域
  crossOrigin: true,
  // 卡片的对齐方式
  align: 'center',
})

// 渲染完成
function afterRender() {
  loading.value = false
}
</script>

<template>
  <div v-loading="loading" class="h-screen">
    <Waterfall :list="list" v-bind="options" @after-render="afterRender">
      <template #default="{ item }">
        <div class="waterfall-card">
          <LazyImg :url="item.url" />
        </div>
      </template>
    </Waterfall>
  </div>
</template>

<style scoped>
.waterfall-card {
  position: relative;

  .lazy__img[lazy='loading'] {
    opacity: 0;
    transition: opacity 2s;
  }

  .lazy__img[lazy='loaded'] {
    opacity: 1;
  }

  .lazy__img[lazy='error'] {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
