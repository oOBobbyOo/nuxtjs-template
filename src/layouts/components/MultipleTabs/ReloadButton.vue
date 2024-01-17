<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'
import { useAppStore } from '@/stores/modules/app'

defineOptions({ name: 'ReloadButton' })

const { t } = useI18n()

const app = useAppStore()
</script>

<template>
  <div class="h-full w-64px flex-center cursor-pointer hover:bg-#f6f6f6 dark:hover:bg-#333" @click="app.reloadPage">
    <el-tooltip placement="bottom" :content="t('layout.multipleTab.reload')">
      <Icon size="22" icon="mdi:refresh" />
    </el-tooltip>
  </div>
</template>

<style scoped></style>
