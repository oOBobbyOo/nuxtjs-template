<script setup lang="ts">
import type { EdgeProps, Position } from '@vue-flow/core'
import { getBezierPath } from '@vue-flow/core'
import type { Colors } from '../flows/RGB.vue'

interface EdgeData {
  text?: string
  color?: Colors
}

interface CustomEdgeProps extends EdgeProps<EdgeData> {
  source: string
  target: string
  sourceHandleId?: string
  targetHandleId?: string
  id: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition: Position
  targetPosition: Position
  markerEnd: string
  data: {
    text?: string
    color?: Colors
  }
}

const props = defineProps<CustomEdgeProps>()

const edgePath = computed(() => getBezierPath(props))
</script>

<template>
  <path
    :id="`${id}-${data.color}`" class="vue-flow__edge-path" :style="{ stroke: data.color, strokeWidth: '3' }"
    :d="edgePath[0]" :marker-end="markerEnd"
  />
  <text>
    <textPath
      :href="`#${id}-${data.color}`" :style="{ fontSize: '1.25rem', fill: 'white' }" startOffset="50%"
      text-anchor="middle"
    >
      {{ data.text }}
    </textPath>
  </text>
</template>

<style scoped>

</style>
