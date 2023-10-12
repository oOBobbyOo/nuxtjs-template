<script setup lang="ts">
import SidebarTrigger from '@/layouts/components/SidebarTrigger/index.vue'
import FullScreen from '@/layouts/components/FullScreen/index.vue'
import DarkMode from '@/layouts/components/DarkMode/index.vue'
import LangSetting from '@/layouts/components/LangSetting/index.vue'
import UserProfile from '@/layouts/components/UserProfile/index.vue'

defineOptions({ name: 'LayoutHeader' })
</script>

<template>
  <div class="layout-header">
    <div class="header-lf h-full flex-1">
      <SidebarTrigger />
    </div>
    <div class="header-ri h-full flex-center">
      <FullScreen />
      <DarkMode />
      <LangSetting />
      <UserProfile />
    </div>
  </div>
</template>

<style scoped lang="less">
.layout-header {
  height: 64px;

  @apply flex-between px-4 bg-white dark:bg-dark sticky top-0 z-999 b-b-1 b-b-gray-100 dark:b-b-gray-200 box-border;
}
</style>
