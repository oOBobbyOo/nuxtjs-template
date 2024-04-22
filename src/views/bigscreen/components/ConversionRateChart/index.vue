<script setup lang="ts">
import type { EChartsOption } from '@/composables/echarts'

const conversionRate = [
  {
    name: '转化率',
    value: 44,
  },
]

const options: EChartsOption = {
  tooltip: {
    backgroundColor: 'transparent',
    borderColor: '#468EFD',
    textStyle: {
      color: '#468EFD',
      fontSize: 14,
    },
    formatter: '{b}: {c}%',
  },
  series: [
    {
      name: '内部进度条',
      type: 'gauge',
      radius: '50%',
      splitNumber: 10,
      axisLine: {
        lineStyle: {
          color: [
            [0.44, '#468EFD'],
            [1, '#111F42'],
          ],
          width: 8,
        },
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      detail: {
        offsetCenter: [0, 90],
        padding: [0, 0, 0, 0],
        fontSize: 28,
        fontWeight: 700,
        color: '#468EFD',
        formatter: '{value}%',
      },
      title: {
        show: true,
        offsetCenter: [0, '60%'],
        color: '#0286ff',
        fontSize: 16,
        fontWeight: 400,
      },
      data: conversionRate,
      pointer: {
        show: true,
        length: '75%',
        width: 10,
      },
      animationDuration: 4000,
    },
    {
      name: '外部刻度',
      type: 'gauge',
      radius: '72%',
      min: 0, // 最小刻度
      max: 100, // 最大刻度
      splitNumber: 10, // 刻度数量
      startAngle: 225,
      endAngle: -45,
      axisLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: [[1, 'rgba(0,0,0,0)']],
        },
      },
      axisLabel: {
        // 仪表盘轴线
        show: true,
        color: '#4d5bd1',
        distance: 25,
      },
      axisTick: {
        // 刻度标签
        show: true,
        splitNumber: 7,
        lineStyle: {
          color: '#468EFD',
          width: 1,
        },
        length: -8,
      },
      splitLine: {
        // 刻度样式
        show: true,
        length: -20,
        lineStyle: {
          color: '#468EFD',
        },
      },
      detail: {
        show: false,
      },
      pointer: {
        show: false,
      },
    },
  ],
}
</script>

<template>
  <Echarts :options="options" />
</template>

<style scoped lang="less"></style>
