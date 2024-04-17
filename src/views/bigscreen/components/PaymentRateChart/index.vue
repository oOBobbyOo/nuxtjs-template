<script setup lang="ts">
import type { EChartsOption } from '@/composables/echarts'
import echarts from '@/composables/echarts'

const options: EChartsOption = {
  title: {
    text: '付费率',
    left: 'center',
    top: 'center',
    subtext: '32%',
    textStyle: {
      fontSize: 32,
      color: '#fff',
    },
    subtextStyle: {
      fontSize: 28,
      color: '#468EFD',
    },
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c}',
  },
  series: [
    {
      name: '付费率',
      type: 'pie',
      radius: ['50%', '80%'],
      padAngle: 5,
      data: [
        { value: 640, name: '活跃人数' },
        { value: 310, name: '付费人数' },
      ],
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
