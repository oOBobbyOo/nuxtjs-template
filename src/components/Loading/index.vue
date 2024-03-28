<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'
import { useThemeStore } from '@/stores/modules/theme'

defineOptions({ name: 'Loading' })

const { t } = useI18n()

const themeStore = useThemeStore()
const themeColor = computed(() => themeStore.themeColor)

const loadingClasses = [
  'left-0 top-0',
  'left-0 bottom-0 animate-delay-500',
  'right-0 top-0 animate-delay-1000',
  'right-0 bottom-0 animate-delay-1500',
]
</script>

<template>
  <div class="absolute-center flex-col">
    <div class="my-26px h-46px w-46px">
      <div class="relative h-full animate-spin">
        <div
          v-for="(item, index) in loadingClasses"
          :key="index"
          class="bg-color absolute h-16px w-16px animate-pulse rounded-8px"
          :class="item"
        />
      </div>
    </div>
    <span class="text-color text-14px font-500">{{ t('common.loading') }}</span>
  </div>
</template>

<style scoped lang="less">
.bg-color {
  background-color: v-bind(themeColor);
}
.text-color {
  color: v-bind(themeColor);
}
</style>
