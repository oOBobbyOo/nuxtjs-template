<script setup lang="ts">
import TabDetail from './TabDetail.vue'
import ReloadButton from './ReloadButton.vue'

defineOptions({ name: 'MultipleTabs' })

const bsWrapper = ref<HTMLElement>()

const bsScroll = ref<HTMLElement>()
</script>

<template>
  <div
    class="multiple-tabs sticky top-0 z-998 box-border w-full flex-y-center bg-white pl-16px dark:b-b-1 dark:b-b-dark-200 dark:bg-dark"
  >
    <div ref="bsWrapper" class="h-full flex-1-hidden">
      <better-scroll ref="bsScroll" :options="{ scrollX: true, scrollY: false }">
        <TabDetail />
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
