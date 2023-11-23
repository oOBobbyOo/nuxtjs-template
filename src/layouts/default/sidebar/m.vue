<script setup lang="ts">
import Menu from './Menu.vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

const { getShowSidebar, toggleShowSidebar } = useMenuSetting()
</script>

<template>
  <el-drawer
    v-model="getShowSidebar"
    class="layout-drawer"
    size="200"
    :with-header="true"
    :show-close="false"
    direction="ltr"
    @close="toggleShowSidebar"
  >
    <template #header>
      <Logo />
    </template>
    <template #default>
      <Menu />
    </template>
  </el-drawer>
</template>

<style scopped lang="less">
.layout-drawer {
  .el-drawer__header {
    padding: 0;
    margin-bottom: 0;
  }

  .el-drawer__body {
    padding: 0;
  }
}
</style>
