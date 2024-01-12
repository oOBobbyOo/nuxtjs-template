<script setup lang="ts">
import type { Chart } from '@/hooks/web/useG2Chart'
import { useG2Chart } from '@/hooks/web/useG2Chart'

defineOptions({ name: 'G2Chart' })

withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '100%',
})

const emit = defineEmits<{
  (e: 'setCharts', chart: Chart): void
}>()

interface Props {
  width?: string
  height?: string
}

const g2ChartRef = ref<HTMLDivElement | null>(null)

const { getInstance } = useG2Chart(g2ChartRef as Ref<HTMLDivElement>)

onMounted(() => {
  const chartInstance = getInstance()
  emit('setCharts', chartInstance as Chart)
})
</script>

<template>
  <div ref="g2ChartRef" :style="{ height, width }" />
</template>

<style scoped lang="less"></style>
