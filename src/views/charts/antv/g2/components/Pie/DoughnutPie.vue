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
  chart.coordinate({ type: 'theta', outerRadius: 0.8, innerRadius: 0.5 })

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

  chart
    .text()
    .style('text', '主机')
    // Relative position
    .style('x', '50%')
    .style('y', '50%')
    .style('dy', -25)
    .style('fontSize', 30)
    .style('fill', '#8c8c8c')
    .style('textAlign', 'center')

  chart
    .text()
    .style('text', '200')
    // Relative position
    .style('x', '50%')
    .style('y', '50%')
    .style('dx', -10)
    .style('dy', 20)
    .style('fontSize', 36)
    .style('fill', '#8c8c8c')
    .style('textAlign', 'center')

  chart
    .text()
    .style('text', '台')
    // Relative position
    .style('x', '50%')
    .style('y', '50%')
    .style('dx', 35)
    .style('dy', 22)
    .style('fontSize', 20)
    .style('fill', '#8c8c8c')
    .style('textAlign', 'center')

  chart.render()
}
</script>

<template>
  <G2Chart @set-charts="setCharts" />
</template>

<style scoped></style>
