<script setup lang="ts">
defineOptions({ name: 'Statistic' })

defineProps<Props>()

defineSlots<Slots>()

interface Props {
  value: number
  title: string
  tooltip?: string
}

interface Slots {
  body?: (props?: Record<string, unknown>) => any
  footer?: (props?: Record<string, unknown>) => any
}
</script>

<template>
  <div class="statistic-card b-rd-2 p-4">
    <el-statistic :value="value">
      <template #title>
        <div class="mb-2 flex-between">
          {{ title }}
          <el-tooltip v-if="tooltip" effect="dark" placement="top" :content="tooltip">
            <Icon size="14" icon="ph:warning-circle-bold" />
          </el-tooltip>
        </div>
      </template>
    </el-statistic>
    <slot name="body" />
    <slot name="footer" />
  </div>
</template>

<style scoped lang="less">
.statistic-card {
  background-color: var(--el-bg-color-overlay);
}
</style>
