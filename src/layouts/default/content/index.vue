<script setup lang="ts">
import LayoutPage from '@/layouts/page/index.vue'

defineOptions({ name: 'LayoutContent' })
</script>

<template>
  <div
    class="layout-content flex flex-col overflow-x-hidden overflow-y-auto bg-gray-50 p-4 dark:bg-dark-8"
  >
    <LayoutPage />
  </div>
</template>

<style scoped lang="less">
.layout-content {
  height: calc(100vh - 156px);
}
</style>
