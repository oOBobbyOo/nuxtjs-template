<script setup lang="ts">
import SidebarTrigger from '@/layouts/components/SidebarTrigger/index.vue'
import BreadcrumbNav from '@/layouts/components/BreadcrumbNav/index.vue'
import FullScreen from '@/layouts/components/FullScreen/index.vue'
import DarkMode from '@/layouts/components/DarkMode/index.vue'
import LangSetting from '@/layouts/components/LangSetting/index.vue'
import UserProfile from '@/layouts/components/UserProfile/index.vue'
import SettingDarwer from '@/layouts/components/SettingDarwer/index.vue'

defineOptions({ name: 'LayoutHeader' })
</script>

<template>
  <div class="layout-header">
    <div class="header-lf h-full flex-y-center flex-1">
      <SidebarTrigger />
      <BreadcrumbNav />
    </div>
    <div class="header-ri h-full flex-center">
      <FullScreen />
      <DarkMode />
      <LangSetting />
      <UserProfile />
      <SettingDarwer />
    </div>
  </div>
</template>

<style scoped lang="less">
.layout-header {
  height: 64px;
  box-shadow: 0 1px 2px #00152914;

  @apply flex-between px-4 bg-white dark:bg-dark sticky top-0 z-999 dark:b-b-1 dark:b-b-dark-200 box-border
   dark:text-white;
}
</style>
