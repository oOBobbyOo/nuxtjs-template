<script setup lang="ts">
import type { MenuRecordRaw } from '@/router/types'
import { useI18n } from '@/hooks/web/useI18n'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

defineOptions({ name: 'SidebarMenuItem' })

defineProps<{ item: MenuRecordRaw }>()

const { t } = useI18n()

const { getCollapsed } = useMenuSetting()

const { routerPush } = useRouterPush(true)

function handleClickMenu(item: MenuRecordRaw) {
  if (item.name === 'IfameBlank')
    routerPush(item.path, true)
  else
    routerPush(item.path, false)
}
</script>

<template>
  <el-sub-menu v-if="item.children?.length" :index="item.path">
    <template #title>
      <Icon v-if="item.meta.icon" :size="getCollapsed ? 22 : 20" :icon="item.meta.icon" />
      <span pl-2>{{ t(item.meta.title) }}</span>
    </template>
    <MenuItem v-for="child in item.children" :key="child.name" :item="child" />
  </el-sub-menu>
  <el-menu-item v-else :index="item.path" @click="handleClickMenu(item)">
    <Icon v-if="item.meta.icon" size="20" :icon="item.meta.icon" />
    <template #title>
      <span pl-2>{{ t(item.meta.title) }}</span>
    </template>
  </el-menu-item>
</template>

<style scoped label="less">
.el-menu-item {
  margin-top: 6px;
  border-radius: var(--el-border-radius);

  &.is-active {
    background-color: var(--el-menu-active-bg-color);
  }
}
</style>
