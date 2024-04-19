<script setup lang="ts">
import type { EChartsOption } from '@/composables/echarts'
import echarts from '@/composables/echarts'

const newlyPayment = {
  xData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  payData: [600, 238, 555, 420, 220, 824, 764],
}

const options: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'transparent',
    textStyle: {
      color: '#00E884',
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
        color: '#3eb2e8',
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
    data: newlyPayment.xData,
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        color: '#0c3b71',
      },
    },
    axisLine: {
      show: false,
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
      name: '新增付费',
      type: 'bar',
      barWidth: '20%',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#00E884',
          },
          {
            offset: 0.5,
            color: '#01F1AE',
          },
          {
            offset: 1,
            color: '#00F5C2',
          },
        ]),
        borderRadius: [15, 15, 0, 0],
      },
      data: newlyPayment.payData,
    },
  ],
}
</script>

<template>
  <Echarts :options="options" />
</template>

<style scoped lang="less"></style>
