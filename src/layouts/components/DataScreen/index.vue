<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

const { routerPush } = useRouterPush()

function handleDataScreen() {
  routerPush({
    path: '/bigscreen',
  })
}
</script>

<template>
  <div h-full flex-center cursor-pointer px-2 @click="handleDataScreen">
    <el-tooltip placement="bottom" :content="t('layout.header.datascreen')">
      <Icon :size="20" icon="ant-design:fund-projection-screen-outlined" />
    </el-tooltip>
  </div>
</template>

<style scoped></style>
