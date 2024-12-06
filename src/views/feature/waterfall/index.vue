<script setup lang="ts">
import type { ViewCard } from 'vue-waterfall-plugin-next/dist/types/types/waterfall'
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'

import { random, times } from 'lodash-es'
import { nanoid } from 'nanoid'
import errorImg from '@/assets/common/error.png'
import loadingImg from '@/assets/common/loading.png'

import { getRandomImg } from '@/utils'

const getList = (pageSize = 10) => times(pageSize, () => ({ id: nanoid(), url: getRandomImg() }))

const loading = ref(true)
const moreLoading = ref(false)

function useList() {
  const pages = ref(5) // 总页数
  const page = ref(0) // 当前页数
  const list = ref<ViewCard[]>([])

  function handleChangePage(val: number) {
    page.value = val
    handleLoadMore()
  }

  // 加载更多
  function handleLoadMore() {
    if (page.value >= pages.value)
      return
    moreLoading.value = true
    setTimeout(() => {
      page.value += 1
      list.value.push(...getList(24))
      moreLoading.value = false
    }, 1000)
  }

  return {
    list,
    page,
    pages,
    handleLoadMore,
    handleChangePage,
  }
}

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
    1680: {
      // 当屏幕宽度小于等于1680
      rowPerView: 5,
    },
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
      const minRatio = random(3, 4, false)
      const maxRatio = random(3, 4, false)
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

const backgroundColor = computed(() => isDark.value ? '#222' : '#fff')

const {
  list,
  page,
  pages,
  handleLoadMore,
} = useList()

onMounted(() => {
  handleLoadMore()
})

// 渲染完成
function afterRender() {
  loading.value = false
}
</script>

<template>
  <div v-loading="loading" class="h-full overflow-hidden b-rd-1">
    <div class="h-full overflow-y-auto">
      <Waterfall :list="list" v-bind="options" :background-color="backgroundColor" @after-render="afterRender">
        <template #default="{ item }">
          <div class="waterfall-card">
            <LazyImg
              :url="item.url"
              class="cursor-pointer b-rd-2 transition-all duration-300 ease-linear group-hover:scale-105"
            />
          </div>
        </template>
      </Waterfall>
      <div v-show="!loading" class="flex justify-center py-6">
        <button
          v-if="page < pages"
          class="flex cursor-pointer items-center gap-1 rounded-full bg-gray-700 px-5 py-2 text-sm text-white transition-all duration-300 hover:bg-gray-800"
          @click="handleLoadMore"
        >
          <Icon v-show="moreLoading" icon="line-md:loading-twotone-loop" size="18" />
          加载更多
        </button>
        <p v-else class="py-2 text-sm text-gray-500">
          已经触底了O(∩_∩)O~
        </p>
      </div>
    </div>
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
