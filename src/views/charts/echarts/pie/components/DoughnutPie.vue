<script setup lang="ts">
import type { EChartsOption } from '@/composables/echarts'

// 环形图
const options: EChartsOption = {
  color: ['#F2A695', '#8693F3', '#FCC667', '#FA76CD'],
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)',
  },
  // 右侧图例
  legend: {
    itemGap: 20,
    top: '10%',
    icon: 'circle',
    data: ['失败', '成功', '待执行'],
  },
  series: [
    {
      name: '任务完成情况',
      type: 'pie',
      radius: ['35%', '60%'],
      avoidLabelOverlap: false,
      // 图形样式
      itemStyle: {
        borderColor: '#ffffff',
        borderWidth: 5,
      },
      label: {
        show: false,
        position: 'center',
        formatter: '{text|{b}}\n{value|{c}}',
        rich: {
          text: {
            color: '#666',
            fontSize: 14,
            align: 'center',
            verticalAlign: 'middle',
            padding: 5,
          },
          value: {
            color: '#8693F3',
            fontSize: 24,
            align: 'center',
            verticalAlign: 'middle',
          },
        },
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 30,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 335, name: '失败' },
        { value: 310, name: '成功' },
        { value: 234, name: '待执行' },
      ],
    },
  ],
}
</script>

<template>
  <Echarts :options="options" />
</template>

<style scoped lang="less"></style>
