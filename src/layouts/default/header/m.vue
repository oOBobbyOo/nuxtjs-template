<script setup lang="ts">
import DarkMode from '@/layouts/components/DarkMode/index.vue'
import LangSetting from '@/layouts/components/LangSetting/index.vue'
import UserProfile from '@/layouts/components/UserProfile/index.vue'

import { usePageTitle } from '@/hooks/web/usePageTitle'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

defineOptions({ name: 'MLayoutHeader' })

const title = usePageTitle()

const { getShowSidebar, toggleShowSidebar } = useMenuSetting()
</script>

<template>
  <div class="layout-header">
    <div class="header-lf h-full flex-y-center cursor-pointer" @click="toggleShowSidebar">
      <Icon
        size="20"
        :icon="getShowSidebar ? 'line-md:menu-unfold-right' : 'line-md:menu-unfold-left'"
      />
    </div>
    <div class="header-md h-full flex-center flex-1">
      {{ title }}
    </div>
    <div class="header-ri h-full flex-center">
      <el-popover placement="bottom" :width="220" trigger="click">
        <template #reference>
          <div h-full flex-y-center cursor-pointer>
            <Icon size="20" icon="uiw:more" />
          </div>
        </template>
        <template #default>
          <div className="flex items-center justify-end space-x-4">
            <DarkMode />
            <LangSetting />
            <UserProfile />
          </div>
        </template>
      </el-popover>
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
