<script setup lang="ts">
import SwitchItem from './SwitchItem.vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'

defineOptions({ name: 'PageFunc' })

const { getCollapsed, toggleCollapsed } = useMenuSetting()
const { getOpenNProgress, toggleOpenNProgress } = useTransitionSetting()
</script>

<template>
  <div>
    <SwitchItem
      :model-value="unref(getCollapsed)"
      label="折叠菜单"
      @update:model-value="toggleCollapsed"
    />
    <SwitchItem
      :model-value="unref(getOpenNProgress)"
      label="顶部进度条"
      @update:model-value="toggleOpenNProgress"
    />
  </div>
</template>

<style scoped></style>
