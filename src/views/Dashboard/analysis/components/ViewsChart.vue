<script setup lang="ts">
import type { EChartsOption } from '@/composables/echarts'

interface ViewsData {
  x: string | number
  pv: number
  uv: number
  ip: number
}

interface Props {
  viewsData: ViewsData[]
}

const props = defineProps<Props>()

const hours = computed(() => {
  return props.viewsData.map(item => `${item.x}:00`)
})

const pv = computed(() => {
  return props.viewsData.map(item => item.pv)
})

const uv = computed(() => {
  return props.viewsData.map(item => item.uv)
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
    data: ['pv', 'uv'],
  },
  xAxis: {
    type: 'category',
    data: unref(hours),
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      type: 'line',
      name: 'pv',
      data: unref(pv),
      color: '#0A78D2',
      smooth: true,
      emphasis: {
        focus: 'series',
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: '#0A78D2',
            },
            {
              offset: 1,
              color: '#fff',
            },
          ],
        },
      },
    },
    {
      type: 'line',
      name: 'uv',
      data: unref(uv),

      color: '#14D3BA',
      smooth: true,
      emphasis: {
        focus: 'series',
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.15,
              color: '#14D3BA',
            },
            {
              offset: 1,
              color: '#fff',
            },
          ],
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
