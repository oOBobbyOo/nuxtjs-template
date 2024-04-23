<script setup lang="ts">
import { mapData } from '@/views/charts/echarts/map/data'
import type { EChartsOption } from '@/composables/echarts'

const options: EChartsOption = {
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(0, 0, 0, .6)',
    borderColor: '#00F6FF',
    textStyle: {
      color: '#00F6FF',
      fontSize: 16,
    },
  },
  geo: {
    map: 'china',
    roam: true,
    zoom: 1.1,
    scaleLimit: {
      min: 1,
      max: 2,
    },
    label: {
      show: true,
      color: 'rgb(249, 249, 249)',
      fontSize: 12,
    },
    itemStyle: {
      areaColor: {
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#073684', // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#061E3D', // 100% 处的颜色
          },
        ],
      },
      borderColor: '#215495',
      borderWidth: 1,
      shadowColor: 'rgba(10,76,139,1)',
      shadowOffsetY: 0,
      shadowBlur: 60,
    },
    emphasis: {
      itemStyle: {
        areaColor: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#073684', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#2B91B7', // 100% 处的颜色
            },
          ],
        },
        borderColor: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: '#00F6FF',
            },
            {
              offset: 1,
              color: '#53D9FF',
            },
          ],
          false,
        ),
      },
      label: {
        show: true,
        color: '#00F6FF',
        fontSize: 16,
      },
    },
  },
  series: [
    {
      name: '在线人数',
      type: 'map',
      map: 'china',
      geoIndex: 0,
      data: mapData,
    },
  ],
}
</script>

<template>
  <Echarts :options="options" />
</template>

<style scoped lang="less"></style>
