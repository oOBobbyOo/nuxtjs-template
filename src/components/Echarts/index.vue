<script setup lang="ts">
import type { EChartsOption } from '@/composables/echarts'
import { useEcharts } from '@/hooks/web/useEcharts'

defineOptions({ name: 'Echarts' })

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '100%',
})

interface Props {
  width?: string
  height?: string
  options: EChartsOption
}

const chartRef = ref<HTMLDivElement | null>(null)

const { setOptions } = useEcharts(chartRef as Ref<HTMLDivElement>)

onMounted(() => {
  setOptions(props.options)
})
</script>

<template>
  <div ref="chartRef" :style="{ height, width }" />
</template>

<style scoped lang="less"></style>
