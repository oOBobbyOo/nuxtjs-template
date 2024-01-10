<script setup lang="ts">
import type { EChartsOption } from '@/composables/echarts'

interface SalesData {
  x: string[] | number[]
  y: number[]
  t: string
}

export interface Props {
  data: SalesData[]
}

const props = defineProps<Props>()

const months = computed(() => {
  return props.data[0].x.map(item => `${item}月`)
})

const legends = computed(() => {
  return props.data.map(item => `${item.t}`)
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
    data: unref(legends),
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
      name: props.data[0].t,
      data: props.data[0].y,
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
      name: props.data[1].t,
      stack: '总量',
      data: props.data[1].y,
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
