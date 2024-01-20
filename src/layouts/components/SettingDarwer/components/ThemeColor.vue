<script setup lang="ts">
import { useEleTheme } from '@/hooks/web/useEleTheme'
import { useThemeStore } from '@/stores/modules/theme'

defineOptions({ name: 'ThemeColor' })

withDefaults(defineProps<Props>(), {
  palettes: () => [
    '#3b82f6',
    '#6366f1',
    '#8b5cf6',
    '#a855f7',
    '#0ea5e9',
    '#06b6d4',
    '#f43f5e',
    '#ef4444',
    '#ec4899',
    '#d946ef',
    '#f97316',
    '#f59e0b',
    '#eab308',
    '#84cc16',
    '#22c55e',
    '#10b981',
    '#14b8a6',
  ],
})

interface Props {
  palettes?: string[]
}

const checkedColor = ref('#3b82f6')

const themeStore = useThemeStore()

const { changeTheme } = useEleTheme(themeStore.themeColor)

function handleSelectColor(palette: string) {
  checkedColor.value = palette

  handleChangeColor(palette)
}

function handleChangeColor(value: string | null) {
  if (value) {
    themeStore.setThemeColor(value)
    changeTheme(value)
  }
}
</script>

<template>
  <div class="space-y-4">
    <div class="grid grid-cols-8 gap-5">
      <div
        v-for="palette in palettes"
        :key="palette"
        class="h-20px w-20px flex-center cursor-pointer rounded-2px shadow"
        :style="{ backgroundColor: palette }"
        @click="handleSelectColor(palette)"
      >
        <Icon
          v-if="checkedColor === palette"
          icon="material-symbols:check-small"
          color="#fff"
          size="20"
        />
      </div>
    </div>
    <div class="flex-y-center justify-between">
      <span>颜色主题</span>
      <el-color-picker v-model="themeStore.themeColor" @change="handleChangeColor" />
    </div>
  </div>
</template>

<style scoped></style>
