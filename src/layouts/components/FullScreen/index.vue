<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'

defineOptions({ name: 'FullScreen' })

const { isFullscreen, toggle } = useFullscreen()
const { t } = useI18n()
</script>

<template>
  <div h-full flex-center cursor-pointer px-2 @click="toggle">
    <el-tooltip
      placement="bottom"
      :content="
        isFullscreen ? t('layout.header.tooltipExitFull') : t('layout.header.tooltipEntryFull')
      "
    >
      <Icon
        :size="20"
        :icon="isFullscreen ? 'gridicons:fullscreen-exit' : 'gridicons:fullscreen'"
      />
    </el-tooltip>
  </div>
</template>
