<script setup lang="ts">
import type { EChartsOption } from '@/composables/echarts'

// 阶梯折线
const options: EChartsOption = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    top: 5,
    data: ['Step Start', 'Step Middle', 'Step End'],
  },
  toolbox: {
    feature: {
      saveAsImage: {
        // 保存为图片
        type: 'png',
      },
    },
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Step Start',
      type: 'line',
      step: 'start',
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: 'Step Middle',
      type: 'line',
      step: 'middle',
      data: [220, 282, 201, 234, 290, 430, 410],
    },
    {
      name: 'Step End',
      type: 'line',
      step: 'end',
      data: [450, 432, 401, 454, 590, 530, 510],
    },
  ],
}
</script>

<template>
  <Echarts :options="options" />
</template>

<style scoped lang="less"></style>
