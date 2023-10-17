<script setup lang="ts">
import type { MenuRecordRaw } from '@/router/types'
import { useI18n } from '@/hooks/web/useI18n'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

defineOptions({ name: 'SidebarMenuItem' })

defineProps<{ item: MenuRecordRaw }>()

const { t } = useI18n()

const { getCollapsed } = useMenuSetting()

const router = useRouter()

function handleClickMenu(item: MenuRecordRaw) {
  router.push(item.path)
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
