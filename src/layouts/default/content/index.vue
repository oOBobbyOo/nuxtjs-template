<script setup lang="ts">
import LayoutPage from '@/layouts/page/index.vue'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'
import { useAppSetting } from '@/hooks/setting/useAppSetting'

defineOptions({ name: 'LayoutContent' })

const { getOpenPageLoading } = useTransitionSetting()
const { getPageLoading } = useAppSetting()
</script>

<template>
  <div
    class="layout-content relative flex flex-col overflow-x-hidden overflow-y-auto bg-gray-50 p-4 dark:bg-dark-8"
  >
    <Loading v-if="getOpenPageLoading && getPageLoading" />
    <LayoutPage v-else />
  </div>
</template>

<style scoped lang="less">
.layout-content {
  height: calc(100vh - 156px);
}
</style>
