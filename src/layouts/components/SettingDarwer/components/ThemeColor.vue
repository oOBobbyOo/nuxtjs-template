<script setup lang="ts">
import { useEleTheme } from '@/hooks/web/useEleTheme'
import { useThemeStore } from '@/stores/modules/theme'

defineOptions({ name: 'ThemeColor' })

const themeStore = useThemeStore()

const { changeTheme } = useEleTheme(themeStore.themeColor)

function handleChangeColor(value: string | null) {
  if (value) {
    themeStore.setThemeColor(value)
    changeTheme(value)
  }
}
</script>

<template>
  <div class="flex-y-center justify-between">
    <span>颜色主题</span>
    <el-color-picker v-model="themeStore.themeColor" @change="handleChangeColor" />
  </div>
</template>

<style scoped></style>
