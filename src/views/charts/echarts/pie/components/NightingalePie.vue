<script setup lang="ts">
import type { EChartsOption } from '@/composables/echarts'

// 南丁格尔玫瑰图
const options: EChartsOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  series: [
    {
      name: '支付来源',
      type: 'pie',
      radius: [50, 150],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8,
      },
      data: [
        { value: 3600, name: '银联' },
        { value: 1400, name: '银行代收' },
        { value: 6900, name: '微信' },
        { value: 2500, name: '支票' },
        { value: 7500, name: '支付宝' },
        { value: 5500, name: '现金' },
        { value: 2550, name: '银行代扣' },
        { value: 4700, name: '第三方支付' },
      ],
    },
  ],
}
</script>

<template>
  <Echarts :options="options" />
</template>

<style scoped lang="less"></style>
