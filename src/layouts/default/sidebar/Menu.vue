<script setup lang="ts">
import MenuItem from './MenuItem.vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { generateMenus } from '@/utils/route'

defineOptions({ name: 'SidebarMenu' })

const { getCollapsed } = useMenuSetting()

const menus = computed(() => generateMenus())

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
    padding: 0 8px;
    border-right: none;

    &.el-menu--collapse {
      padding: 0;
    }
  }

  ::v-deep(.el-sub-menu .el-sub-menu__title) {
    margin-top: 6px;
    border-radius: var(--el-border-radius);
  }

  ::v-deep(.el-sub-menu.is-active .el-sub-menu__title) {
    color: var(--el-menu-active-color);
  }
}
</style>
