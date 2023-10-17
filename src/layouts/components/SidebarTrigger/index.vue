<script setup lang="ts">
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

defineOptions({ name: 'SidebarTrigger' })

const { getCollapsed, toggleCollapsed } = useMenuSetting()
</script>

<template>
  <div h-full flex-y-center cursor-pointer @click="toggleCollapsed">
    <Icon
      size="20"
      :icon="getCollapsed ? 'line-md:menu-unfold-right' : 'line-md:menu-unfold-left'"
    />
  </div>
</template>

<style scoped lang="less"></style>
