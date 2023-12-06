<script setup lang="ts">
import type { EChartsOption } from '@/composables/echarts'

function getseriesData() {
  const data = []

  const trafficWay = [
    {
      name: '正常',
      value: 40,
    },
    {
      name: '报警',
      value: 10,
    },
    {
      name: '离线',
      value: 30,
    },
    {
      name: '故障',
      value: 20,
    },
  ]

  const color = ['#00ffff', '#409B5C', '#006ced', '#ffe000', '#ffa800', '#ff5b00', '#ff3000']

  for (let i = 0; i < trafficWay.length; i++) {
    data.push(
      {
        name: trafficWay[i].name,
        value: trafficWay[i].value,
        itemStyle: {
          borderWidth: 8,
          shadowBlur: 20,
          borderColor: color[i],
          shadowColor: color[i],
        },
      },
      {
        name: '',
        value: 2,
        itemStyle: {
          color: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 0,
        },
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
      },
    )
  }

  return data
}

function getseriesData2() {
  const data = []

  for (let i = 0; i < 4; i++) {
    data.push(
      {
        value: 20,
        itemStyle: {
          borderWidth: 2,
          shadowBlur: 30,
          borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            {
              offset: 0,
              color: '#F3C004',
            },
            {
              offset: 1,
              color: '#F3C004',
            },
          ]),
          shadowColor: 'rgba(142, 152, 241, 0.6)',
        },
      },
      {
        value: 4,
        itemStyle: {
          color: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 0,
        },
      },
    )
  }

  return data
}

// 多层环形图
const options: EChartsOption = {
  title: {
    text: '设备状态',
    top: '47%',
    textAlign: 'center',
    left: '49%',
    textStyle: {
      fontSize: 18,
    },
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '50%'],
      clockwise: false, // 是否是顺时针排布
      label: {
        position: 'outside',
        formatter: '{b} \n\n {d}%',
      },
      labelLine: {
        length: 30,
        length2: 50,
      },
      data: getseriesData(),
    },
    {
      name: '',
      type: 'pie',
      radius: ['42%', '42%'],
      clockwise: true,
      emphasis: {
        disabled: true,
      },
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      data: getseriesData2(),
    },
  ],
}
</script>

<template>
  <Echarts :options="options" />
</template>

<style scoped lang="less"></style>
