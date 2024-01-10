<script setup lang="ts">
import type { EChartsOption } from '@/composables/echarts'

interface SalesData {
  x: string | number
  y: number
  z: number
}

export interface Props {
  data: SalesData[]
}

const props = defineProps<Props>()

const months = computed(() => {
  return props.data.map(item => `${item.x}月`)
})

const data = computed(() => {
  return props.data.map(item => item.y)
})

const fullData = computed(() => {
  return props.data.map(item => item.z)
})

const options: EChartsOption = {
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    top: '10%',
    left: '2%',
    right: '2%',
    bottom: '5%',
    containLabel: true,
  },
  legend: {
    data: ['2023半年销售额', '2023全年销售额'],
  },
  xAxis: {
    type: 'category',
    data: unref(months),
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      type: 'bar',
      name: '2023半年销售额',
      data: unref(data),
      label: {
        show: true,
        formatter(val: any) {
          return `${val.data}万`
        },
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' },
        ]),
      },
    },
    {
      type: 'line',
      name: '2023全年销售额',
      stack: '总量',
      data: unref(fullData),
      label: {
        show: true,
        formatter(val: any) {
          return `${val.data}万`
        },
      },
    },
  ],
}
</script>

<template>
  <Echarts :options="options" />
</template>

<style scoped></style>
