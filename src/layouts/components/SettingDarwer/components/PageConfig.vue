<script setup lang="ts">
import { useEleTheme } from '@/hooks/web/useEleTheme'
import { useAppStore } from '@/stores/modules/app'
import { useThemeStore } from '@/stores/modules/theme'

defineOptions({ name: 'PageConfig' })

const appStore = useAppStore()
const themeStore = useThemeStore()

const { changeTheme } = useEleTheme()

async function handleCopy() {
  ElMessage({
    message: '拷贝当前配置',
    type: 'success',
  })
}

async function handleReset() {
  // 重置Store
  appStore.resetStore()
  themeStore.resetStore()
  // 重置主题模式
  resetDark()
  // 重置主题颜色
  changeTheme(themeStore.themeColor)

  ElMessage({
    message: '重置配置成功',
    type: 'success',
  })
}
</script>

<template>
  <el-space fill wrap class="w-full">
    <el-button type="success" size="default" class="block w-full" @click="handleCopy">
      拷贝当前配置
    </el-button>
    <el-button type="warning" size="default" class="block w-full" @click="handleReset">
      重置当前配置
    </el-button>
  </el-space>
</template>

<style scoped></style>
