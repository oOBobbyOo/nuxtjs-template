<script setup lang="ts">
import type { EChartsOption } from '@/composables/echarts'

// 渐变折线
function xData() {
  const data = []
  for (let i = 1; i < 12; i++) data.push(`${i}月`)

  return data
}

const options: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross', // 十字准星指示器
    },
  },
  xAxis: {
    type: 'category',
    data: xData(),
  },
  yAxis: {
    type: 'value',
  },
  visualMap: [
    {
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: 0,
      max: 400,
    },
  ],
  series: [
    {
      type: 'line',
      data: [116, 129, 135, 86, 73, 68, 92, 130, 245, 115, 111, 206],
    },
  ],
}
</script>

<template>
  <Echarts :options="options" />
</template>

<style scoped lang="less"></style>
