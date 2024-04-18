<script setup lang="ts">
import type { EChartsOption } from '@/composables/echarts'
import echarts from '@/composables/echarts'

const loginTrends = {
  xData: [
    '00:00',
    '02:00',
    '04:00',
    '06:00',
    '08:00',
    '10:00',
    '12:00',
    '14:00',
    '16:00',
    '18:00',
    '20:00',
    '22:00',
  ],
  typeData: ['登录人数', '注册人数'],
  loginData: [693, 738, 485, 331, 489, 924, 487, 755, 621, 955, 713, 627],
  registerData: [533, 633, 200, 180, 199, 422, 310, 280, 399, 333, 210, 180],
}

const options: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'transparent',
    textStyle: {
      color: '#fff',
      fontSize: 14,
    },
    axisPointer: {
      lineStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(126,199,255,0)', // 0% 处的颜色
            },
            {
              offset: 0.5,
              color: 'rgba(126,199,255,1)', // 100% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(126,199,255,0)', // 100% 处的颜色
            },
          ],
        },
      },
    },
  },
  legend: {
    type: 'plain',
    right: '10%',
    itemGap: 22,
    itemWidth: 22,
    textStyle: {
      color: '#7ec7ff',
      fontSize: 16,
    },
    icon: 'rect',
    data: loginTrends.typeData,
  },
  grid: {
    top: '15%',
    left: '10%',
    right: '10%',
    bottom: '15%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLine: {
      show: true,
      lineStyle: {
        color: '#233653',
      },
    },
    axisLabel: {
      color: '#7ec7ff',
      padding: 16,
      fontSize: 14,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#192a44',
      },
    },
    axisTick: {
      show: false,
    },
    data: loginTrends.xData,
  },
  yAxis: {
    name: '人数',
    nameTextStyle: {
      color: '#7ec7ff',
      fontSize: 16,
      padding: 10,
    },
    min: 0,
    splitLine: {
      show: true,
      lineStyle: {
        color: '#192a44',
      },
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#233653',
      },
    },
    axisLabel: {
      show: true,
      color: '#7ec7ff',
      padding: 16,
    },
    axisTick: {
      show: false,
    },
  },
  series: [
    {
      name: '登录人数',
      type: 'line',
      symbol: 'circle',
      smooth: true,
      lineStyle: {
        width: 3,
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: 'rgba(25,163,223,0.3)',
            },
            {
              offset: 1,
              color: 'rgba(25,163,223, 0)',
            },
          ],
          false,
        ),
        shadowColor: 'rgba(25,163,223, 0.5)',
        shadowBlur: 20,
      },
      data: loginTrends.loginData,
    },
    {
      name: '注册人数',
      type: 'line',
      symbol: 'circle',
      smooth: true,
      lineStyle: {
        width: 3,
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: 'rgba(10,219,250, 0.3)',
            },
            {
              offset: 1,
              color: 'rgba(10,219,250, 0)',
            },
          ],
          false,
        ),
        shadowColor: 'rgba(25,163,223, 0.5)',
        shadowBlur: 20,
      },
      data: loginTrends.registerData,
    },
  ],
}
</script>

<template>
  <Echarts :options="options" />
</template>

<style scoped lang="less"></style>
