<script setup lang="ts">
import type { EChartsOption } from '@/composables/echarts'
import echarts from '@/composables/echarts'

const payment = {
  rate: 36,
  payData: [
    { value: 640, name: '活跃人数' },
    { value: 310, name: '付费人数' },
  ],
}

const options: EChartsOption = {
  title: {
    text: '付费率',
    left: 'center',
    top: 'center',
    subtext: `${payment.rate}%`,
    textStyle: {
      fontSize: 32,
      color: '#fff',
    },
    subtextStyle: {
      fontSize: 28,
      color: '#00E884',
    },
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: 'transparent',
    borderColor: '#00E884',
    textStyle: {
      color: '#00E884',
      fontSize: 14,
    },
    formatter: '{b}: {c}',
  },
  series: [
    {
      name: '付费率',
      type: 'pie',
      radius: ['50%', '72%'],
      padAngle: 5,
      data: payment.payData,
      label: {
        color: '#fff',
        fontSize: 14,
      },
      itemStyle: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        color: ({ dataIndex }: { dataIndex: number }) => {
          const colrors = [
            {
              colorStart: '#15B0F7',
              colorEnd: '#0C5BEB ',
            },
            {
              colorStart: '#00E884',
              colorEnd: '#00F5C2',
            },
          ]
          return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: colrors[dataIndex].colorStart },
            { offset: 1, color: colrors[dataIndex].colorEnd },
          ])
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
