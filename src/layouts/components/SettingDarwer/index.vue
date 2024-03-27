<script setup lang="ts">
import DarkMode from './components/DarkMode.vue'
import ThemeColor from './components/ThemeColor.vue'
import PageFunc from './components/PageFunc.vue'
import PageConfig from './components/PageConfig.vue'
import { useDrawer } from '@/hooks/web/useDrawer'
import { PALETTLES } from '@/enums/themeEnum'

defineOptions({ name: 'SettingDrawer' })

const { visible, openDrawer } = useDrawer()
</script>

<template>
  <div h-full flex-center cursor-pointer pl-2 @click="openDrawer">
    <Icon icon="ion:settings-outline" />
    <Drawer v-model:model-value="visible" title="主题配置" :size="368">
      <template #default>
        <el-divider>主题模式</el-divider>
        <DarkMode />
        <el-divider>系统主题</el-divider>
        <ThemeColor :palettes="PALETTLES" />
        <el-divider>页面功能</el-divider>
        <PageFunc />
      </template>
      <template #footer>
        <PageConfig />
      </template>
    </Drawer>
  </div>
</template>

<style scoped></style>
