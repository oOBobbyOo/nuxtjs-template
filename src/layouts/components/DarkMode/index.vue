<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'

defineOptions({ name: 'DarkMode' })

const { t } = useI18n()
</script>

<template>
  <div h-full flex-center cursor-pointer px-2 @click="toggleDark()">
    <el-tooltip
      placement="bottom"
      :content="isDark ? t('layout.header.tooltipDark') : t('layout.header.tooltipLight')"
    >
      <Icon
        :size="16"
        :icon="
          isDark
            ? 'i-line-md-sunny-filled-loop-to-moon-filled-loop-transition'
            : 'i-line-md-moon-to-sunny-outline-transition'
        "
      />
    </el-tooltip>
  </div>
</template>
