<script setup lang="ts">
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

defineOptions({ name: 'SidebarTrigger' })

const { getCollapsed, toggleCollapsed } = useMenuSetting()
</script>

<template>
  <div h-full flex-y-center cursor-pointer @click="toggleCollapsed">
    <Icon
      size="16"
      :icon="getCollapsed ? 'i-line-md-menu-unfold-left' : 'i-line-md-menu-unfold-right'"
    />
  </div>
</template>

<style scoped lang="less"></style>
