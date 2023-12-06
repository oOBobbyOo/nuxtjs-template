<script setup lang="ts">
import type { EChartsOption } from '@/composables/echarts'

function xData() {
  const data = []
  for (let i = 1; i < 31; i++) data.push(`${i}日`)

  return data
}

const options: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow', // 阴影指示器
    },
  },
  legend: {
    data: ['访问量', '订单量'],
  },
  xAxis: {
    type: 'category',
    data: xData(),
  },
  yAxis: {
    type: 'value',
  },
  dataZoom: [
    {
      show: true,
      height: 20,
      xAxisIndex: [0],
      start: 10,
      end: 90,
    },
    {
      type: 'inside',
    },
  ],
  series: [
    {
      name: '访问量',
      type: 'line',
      symbol: 'circle', // 标记类型
      symbolSize: 10, // 标记大小
      markPoint: {
        label: {
          color: '#fff',
        },
        data: [
          {
            type: 'max',
            name: '最大值',
          },
          {
            type: 'min',
            name: '最小值',
          },
        ],
      },
      data: [
        509,
        917,
        2455,
        2610,
        2719,
        3033,
        3044,
        3085,
        2708,
        2809,
        2117,
        2000,
        1455,
        1210,
        719,
        733,
        944,
        2285,
        2208,
        3372,
        3936,
        3693,
        2962,
        2810,
        3519,
        2455,
        2610,
        2719,
        2484,
        2078,
      ],
    },
    {
      name: '订单量',
      type: 'line',
      symbol: 'circle',
      symbolSize: 10,
      markPoint: {
        label: {
          color: '#fff',
        },
        data: [
          {
            type: 'max',
            name: '最大值',
          },
          {
            type: 'min',
            name: '最小值',
          },
        ],
      },
      data: [
        2136,
        3693,
        2962,
        3810,
        3519,
        3484,
        3915,
        3823,
        3455,
        4310,
        4019,
        3433,
        3544,
        3885,
        4208,
        3372,
        3484,
        3915,
        3748,
        3675,
        4009,
        4433,
        3544,
        3285,
        4208,
        3372,
        3484,
        3915,
        3823,
        4265,
        4298,
      ],
    },
  ],
}
</script>

<template>
  <Echarts :options="options" />
</template>

<style scoped lang="less"></style>
