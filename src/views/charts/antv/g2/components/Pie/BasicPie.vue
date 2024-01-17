<script setup lang="ts">
import type { Chart } from '@/hooks/web/useG2Chart'

interface DataProps {
  item: string
  count: number
  percent: number
}

const data: DataProps[] = [
  { item: '事例一', count: 40, percent: 0.4 },
  { item: '事例二', count: 21, percent: 0.21 },
  { item: '事例三', count: 17, percent: 0.17 },
  { item: '事例四', count: 13, percent: 0.13 },
  { item: '事例五', count: 9, percent: 0.09 },
]

function setCharts(chart: Chart) {
  chart.coordinate({ type: 'theta', outerRadius: 0.8 })

  chart
    .interval()
    .data(data)
    .transform({ type: 'stackY' })
    .encode('y', 'percent')
    .encode('color', 'item')
    .legend('color', { position: 'bottom', layout: { justifyContent: 'center' } })
    .label({
      position: 'outside',
      text: (data: DataProps) => `${data.item}: ${data.percent * 100}%`,
    })
    .tooltip(data => ({
      name: data.item,
      value: `${data.percent * 100}%`,
    }))

  chart.render()
}
</script>

<template>
  <G2Chart @set-charts="setCharts" />
</template>

<style scoped></style>
