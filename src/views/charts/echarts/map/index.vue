<script setup lang="ts">
import { mapData } from './data'
import type { EChartsOption } from '@/composables/echarts'

const options: EChartsOption = {
  visualMap: {
    type: 'piecewise',
    min: 0,
    max: 1000,
    left: 'left',
    top: 'bottom',
    text: ['高', '低'],
    calculable: false,
    orient: 'horizontal',
    inRange: {
      color: ['#e0ffff', '#006edd'],
      symbolSize: [30, 100],
    },
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(0, 0, 0, .6)',
    textStyle: {
      color: '#fff',
      fontSize: 12,
    },
  },
  series: [
    {
      name: 'HUAWEI Mate 60',
      type: 'map',
      map: 'china',
      roam: true,
      zoom: 1,
      scaleLimit: {
        min: 1,
        max: 2,
      },
      label: {
        show: true,
        color: 'rgb(249, 249, 249)',
        fontSize: 10,
      },
      itemStyle: {
        areaColor: '#2f82ce',
        borderColor: '#0DAAC1',
      },
      data: mapData,
    },
  ],
}
</script>

<template>
  <Echarts :options="options" />
</template>

<style scoped lang="less"></style>
