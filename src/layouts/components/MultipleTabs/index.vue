<script setup lang="ts">
import type { BScrollInstance } from '@better-scroll/core'
import TabDetail from './TabDetail.vue'
import ReloadButton from './ReloadButton.vue'
import { useTabStore } from '@/stores/modules/tab'

defineOptions({ name: 'MultipleTabs' })

const route = useRoute()
const tab = useTabStore()

const bsWrapper = ref<HTMLElement>()

const { width: bsWrapperWidth, left: bsWrapperLeft } = useElementBounding(bsWrapper)

const bsScroll = ref<BScrollInstance>()

function init() {
  tab.iniTabStore(route)
}

function handleScroll(clientX: number) {
  const currentX = clientX - bsWrapperLeft.value
  const deltaX = currentX - bsWrapperWidth.value / 2
  if (bsScroll.value) {
    const { maxScrollX, x: leftX } = bsScroll.value.bsInstance
    const rightX = maxScrollX - leftX
    const update = deltaX > 0 ? Math.max(-deltaX, rightX) : Math.min(-deltaX, -leftX)
    bsScroll.value?.bsInstance.scrollBy(update, 0, 300)
  }
}

init()

watch(
  () => route.fullPath,
  () => {
    tab.addTab(route)
    tab.setActiveTab(route.fullPath)
  },
)
</script>

<template>
  <div
    class="multiple-tabs sticky top-0 z-998 box-border w-full flex-y-center bg-white pl-16px transition-all dark:b-b-1 dark:b-b-dark-200 dark:bg-dark dark:text-white dark:text-opacity-82"
  >
    <div ref="bsWrapper" class="h-full flex-1-hidden">
      <better-scroll ref="bsScroll" :options="{ scrollX: true, scrollY: false }">
        <TabDetail @scroll="handleScroll" />
      </better-scroll>
    </div>
    <ReloadButton />
  </div>
</template>

<style scoped lang="less">
.multiple-tabs {
  height: 44px;
  box-shadow: 0 1px 2px #00152914;
}
</style>
