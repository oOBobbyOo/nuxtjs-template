<script setup lang="ts">
import type { CSSProperties } from 'vue'
import Menu from './Menu.vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

defineOptions({ name: 'LayoutSidebar' })

const { getRealWidth } = useMenuSetting()

const getSidebarStyle = computed((): CSSProperties => {
  const width = `${unref(getRealWidth)}px`
  return {
    width,
    overflow: 'hidden',
    flex: `0 0 ${width}`,
    maxWidth: width,
    minWidth: width,
    transition: 'all 0.2s',
  }
})
</script>

<template>
  <div class="layout-sidebar" :style="getSidebarStyle">
    <Logo />
    <Menu />
  </div>
</template>

<style scoped lang="less">
.layout-sidebar {
  box-shadow: 2px 0 8px #1d23290d;

  @apply z-9999 bg-white dark:bg-dark b-r-1 b-r-solid b-r-gray-100 dark:b-r-dark-200 box-border dark:text-white;
}
</style>
