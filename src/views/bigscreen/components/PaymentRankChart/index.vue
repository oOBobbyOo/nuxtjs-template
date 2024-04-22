<script setup lang="ts">
import type { EChartsOption } from '@/composables/echarts'

interface PaymentRank {
  name: string
  value: number
  sum: number
}

const paymentRank: PaymentRank[] = [
  {
    name: '姓名1',
    value: Math.random() * 10,
    sum: 10,
  },
  {
    name: '姓名2',
    value: Math.random() * 10,
    sum: 10,
  },
  {
    name: '姓名3',
    value: Math.random() * 10,
    sum: 10,
  },
  {
    name: '姓名4',
    value: Math.random() * 10,
    sum: 10,
  },
  {
    name: '姓名5',
    value: Math.random() * 10,
    sum: 10,
  },
  {
    name: '姓名6',
    value: Math.random() * 10,
    sum: 10,
  },
  {
    name: '姓名7',
    value: Math.random() * 10,
    sum: 10,
  },
  {
    name: '姓名8',
    value: Math.random() * 10,
    sum: 10,
  },
  {
    name: '姓名9',
    value: Math.random() * 10,
    sum: 10,
  },
]

const data = paymentRank.sort((a, b) => b.value - a.value)

function getArrByKey(data: any[], key: string = 'value') {
  const res: any[] = []
  data
    && data.forEach((t) => {
      res.push(t[key])
    })
  return res
}

const color = ['#FC619D', '#FF904D', '#48BFE3']

const options: EChartsOption = {
  grid: {
    top: '20%',
    left: '-2%',
    right: '5%',
    bottom: '0',
    containLabel: true,
  },
  xAxis: {
    show: false,
  },
  yAxis: [
    {
      show: true,
      triggerEvent: true,
      inverse: true,
      data: getArrByKey(data, 'name'),
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
        interval: 0,
        color: '#00F5C2',
        align: 'left',
        margin: 80,
        fontSize: 1,
        formatter(value: string, index: number) {
          if (index < 3)
            return `{idx${index}|${index + 1}} {title|${value}}`
          else return `{idx|${index + 1}} {title|${value}}`
        },
        rich: {
          idx0: {
            color: '#FB375E',
            backgroundColor: '#FFE8EC',
            borderRadius: 100,
            padding: [5, 8],
          },
          idx1: {
            color: '#FF9023',
            backgroundColor: '#FFEACF',
            borderRadius: 100,
            padding: [5, 8],
          },
          idx2: {
            color: '#01B599',
            backgroundColor: '#E1F7F3',
            borderRadius: 100,
            padding: [5, 8],
          },
          idx: {
            color: '#00E884',
            borderRadius: 100,
            padding: [5, 8],
          },
          title: {
            padding: [0, 10],
          },
        },
      },
    },
    {
      show: true,
      triggerEvent: true,
      inverse: true,
      data: getArrByKey(data, 'value'),
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
        interval: 0,
        color: '#00F5C2',
        align: 'left',
        margin: 20,
        fontSize: 12,
        formatter(value: number, index: number) {
          const rate = (value / data[index].sum) * 100
          return `付费占比：${rate.toFixed(2)}%`
        },
      },
    },
  ],
  series: [
    {
      name: '付费金额',
      type: 'bar',
      yAxisIndex: 0,
      data: paymentRank,
      barWidth: 10,
      itemStyle: {
        color: (val) => {
          if (val.dataIndex < 3)
            return color[val.dataIndex]
          else return '#00F5C2'
        },
        borderRadius: 10,
      },
    },
  ],
}
</script>

<template>
  <Echarts :options="options" />
</template>

<style scoped lang="less"></style>
