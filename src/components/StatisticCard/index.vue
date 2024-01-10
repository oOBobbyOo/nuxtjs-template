<script setup lang="ts">
defineOptions({ name: 'StatisticCard' })

defineProps<Props>()

interface Props {
  value: number
  title?: string
  icon?: string
  tooltip?: string
}
</script>

<template>
  <div class="statistic-card b-rd-2 p-4">
    <div class="statistic-header">
      <div v-if="title" class="mb-2 flex-between">
        <span class="text-base">{{ title }}</span>
        <el-tooltip v-if="tooltip" effect="dark" placement="top" :content="tooltip">
          <Icon size="20" :icon="icon ?? 'ph:warning-circle-bold'" />
        </el-tooltip>
      </div>
      <div class="text-3xl">
        {{ value }}
      </div>
    </div>

    <div class="statistic-body flex flex-wrap py-4 space-x-2">
      <slot name="body" />
    </div>
    <div class="statistic-footer flex-between flex-wrap b-t pt-2">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped lang="less">
.statistic-card {
  background-color: var(--el-bg-color-overlay);
  box-shadow: var(--el-box-shadow-light);
}
</style>
