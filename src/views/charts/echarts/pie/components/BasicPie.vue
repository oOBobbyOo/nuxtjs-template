<script setup lang="ts">
import type { EChartsOption } from '@/composables/echarts'

// 基础饼图
const options: EChartsOption = {
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮件营销' },
        { value: 484, name: '联盟广告' },
        { value: 300, name: '视频广告' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
}
</script>

<template>
  <Echarts :options="options" />
</template>

<style scoped lang="less"></style>
