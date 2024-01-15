<script setup lang="ts">
import DarkMode from './components/DarkMode.vue'
import ColorTheme from './components/ColorTheme.vue'
import PageFunc from './components/PageFunc.vue'
import PageConfig from './components/PageConfig.vue'
import { useDrawer } from '@/hooks/web/useDrawer'

defineOptions({ name: 'SettingDrawer' })

const { visible, openDrawer } = useDrawer()
</script>

<template>
  <div h-full flex-center cursor-pointer pl-2 @click="openDrawer">
    <Icon icon="ion:settings-outline" />
    <Drawer v-model:model-value="visible" title="主题配置">
      <template #default>
        <el-divider>主题模式</el-divider>
        <DarkMode />
        <el-divider>系统主题</el-divider>
        <ColorTheme />
        <el-divider>界面功能</el-divider>
        <PageFunc />
      </template>
      <template #footer>
        <el-divider>页面配置 </el-divider>
        <PageConfig />
      </template>
    </Drawer>
  </div>
</template>

<style scoped></style>
