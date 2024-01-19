<script setup lang="ts">
import { useLocale } from '@/hooks/web/useLocale'
import { useEleTheme } from '@/hooks/web/useEleTheme'
import { useThemeStore } from '@/stores/modules/theme'

const { getElLocale } = useLocale()

// 初始化主题色
const themeStore = useThemeStore()
useEleTheme(themeStore.themeColor)
</script>

<template>
  <el-config-provider :locale="getElLocale">
    <RouterView />
  </el-config-provider>
</template>

<style scoped></style>
