<script setup lang="ts">
import MenuItem from './MenuItem.vue'
import type { MenuRecordRaw } from '@/router/types'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { dynamicRoutes } from '@/router/routes/dynamic'

defineOptions({ name: 'SidebarMenu' })

const { getCollapsed } = useMenuSetting()

const menus = computed(() => {
  const list = dynamicRoutes.map((item) => {
    if (item.children?.length) {
      return {
        ...item,
        children: item.children.map((child: MenuRecordRaw) => ({
          ...child,
          path: `${item.path}/${child.path}`,
        })),
      }
    }
    return item
  })
  return list.sort(
    (a: MenuRecordRaw, b: MenuRecordRaw) => (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0),
  )
})

const route = useRoute()
const activeMenu = computed(() => route.path)
</script>

<template>
  <el-scrollbar class="menu-scrollbar">
    <el-menu :collapse="getCollapsed" :unique-opened="true" :default-active="activeMenu">
      <MenuItem v-for="menu in menus" :key="menu.name" :item="menu" />
    </el-menu>
  </el-scrollbar>
</template>

<style scoped label="less">
.menu-scrollbar {
  height: calc(100vh - 64px);

  .el-menu {
    border-right: none;
  }
}
</style>
