<script setup lang="ts">
import type { EChartsOption } from '@/composables/echarts'

const color = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6']

// 反转坐标轴
const options: EChartsOption = {
  title: {
    text: '每月销售额统计',
    left: '50%',
    textAlign: 'center',
    textStyle: {
      fontSize: 22,
    },
    top: 10,
  },
  grid: {
    bottom: '0%',
    containLabel: true,
  },
  xAxis: {
    show: false,
  },
  yAxis: [
    {
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      inverse: true,
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        rich: {
          lg: {
            backgroundColor: '#339911',
            color: '#fff',
            padding: 5,
            align: 'center',
            width: 15,
            height: 15,
          },
        },
      },
    },
    {
      show: true,
      inverse: true,
      data: [
        '11.03亿',
        '9.06亿',
        '12.60亿',
        '10.85亿',
        '10.00亿',
        '9.89亿',
        '7.34亿',
        '9.56亿',
        '12.10亿',
        '12.13亿',
        '8.99亿',
        '1亿',
      ],
      axisLabel: {
        fontSize: 12,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: '销售完成占比',
      type: 'bar',
      yAxisIndex: 1,
      data: [110, 98, 100, 99, 80, 110, 98, 100, 99, 80, 80, 10],
      barWidth: 20,
      itemStyle: {
        borderRadius: 30,
        color(params) {
          return color[params.dataIndex % color.length]
        },
      },
      label: {
        show: true,
        position: 'inside',
        color: '#fff',
        formatter: '{c}%',
      },
    },
  ],
}
</script>

<template>
  <Echarts :options="options" />
</template>

<style scoped lang="less"></style>
