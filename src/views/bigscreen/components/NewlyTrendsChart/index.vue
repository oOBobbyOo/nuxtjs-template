<script setup lang="ts">
import type { EChartsOption } from '@/composables/echarts'
import echarts from '@/composables/echarts'

const loginTrends = {
  xData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  newlyData: [69, 38, 185, 331, 189, 224, 87],
}

const options: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'transparent',
    textStyle: {
      color: '#00feff',
      fontSize: 14,
    },
  },
  grid: {
    top: '10%',
    left: '10%',
    right: '10%',
    bottom: '10%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    splitLine: {
      show: false,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#233653',
      },
    },
    axisLabel: {
      show: true,
      color: '#7ec7ff',
      fontSize: 12,
    },
    axisTick: {
      show: false,
    },
    data: loginTrends.xData,
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: false,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#0c3b71',
      },
    },
    axisLabel: {
      show: true,
      color: '#7ec7ff',
      fontSize: 12,
    },
    axisTick: {
      show: false,
    },
  },
  series: [
    {
      name: '新增用户',
      type: 'bar',
      barWidth: '20%',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#00feff',
          },
          {
            offset: 0.5,
            color: '#027eff',
          },
          {
            offset: 1,
            color: '#0286ff',
          },
        ]),
        borderRadius: [15, 15, 0, 0],
      },
      data: loginTrends.newlyData,
    },
  ],
}
</script>

<template>
  <Echarts :options="options" />
</template>

<style scoped lang="less"></style>
