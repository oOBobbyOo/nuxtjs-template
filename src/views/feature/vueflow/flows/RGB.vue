<script setup lang="ts">
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'
import '@vue-flow/minimap/dist/style.css'

import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap, type MiniMapNodeFunc } from '@vue-flow/minimap'
import { breakpointsTailwind } from '@vueuse/core'

import CustomEdge from '../edges/CustomEdge.vue'
import RGBNode from '../nodes/RGBNode.vue'
import RGBOutputNode from '../nodes/RGBOutputNode.vue'

export type Colors = 'red' | 'blue' | 'green'

const emit = defineEmits(['pane'])

const breakpoints = useBreakpoints(breakpointsTailwind)

const { onPaneReady, findNode, panOnDrag } = useVueFlow({
  id: 'rgb-flow',
  nodes: [
    { id: '1', type: 'rgb', data: { color: 'green' }, position: { x: 50, y: 50 } },
    { id: '2', type: 'rgb', data: { color: 'red' }, position: { x: 50, y: 200 } },
    { id: '3', type: 'rgb', data: { color: 'blue' }, position: { x: 50, y: 350 } },
    { id: '4', type: 'rgb-output', label: 'RGB', position: { x: 400, y: 225 } },
  ],
  edges: [
    { id: 'e1-4', type: 'rgb-line', data: { color: 'green' }, source: '1', target: '4', animated: true },
    { id: 'e2-4', type: 'rgb-line', data: { color: 'red' }, source: '2', target: '4', animated: true },
    { id: 'e3-4', type: 'rgb-line', data: { color: 'blue' }, source: '3', target: '4', animated: true },
  ],
  zoomOnScroll: false,
  preventScrolling: false,
})

onPaneReady(i => emit('pane', i))

const el = templateRef<HTMLDivElement>('el', null)

const color = ref<Record<Colors, number>>({
  red: 222,
  green: 45,
  blue: 140,
})

watch(
  [breakpoints.sm, breakpoints.md, breakpoints.lg, breakpoints.xl, breakpoints['2xl']],
  () => {
    const mobile = breakpoints.isSmaller('md')
    if (mobile) {
      const node = findNode('4')

      if (node)
        node.position = { x: 300, y: -25 }
    }

    panOnDrag.value = !mobile
  },
  { immediate: true },
)

function onChange({ color: c, val }: { color: Colors; val: number }) {
  return (color.value[c] = Number(val))
}

const nodeColor: MiniMapNodeFunc = (node) => {
  switch (node.id) {
    case '1':
      return 'green'
    case '2':
      return 'red'
    case '3':
      return 'blue'
    case '4':
      return `rgb(${color.value.red}, ${color.value.green}, ${color.value.blue})`
  }
  return ''
}
</script>

<template>
  <div
    ref="el"
    class="h-full w-full overflow-hidden border-2 rounded-xl font-mono uppercase shadow-xl dark:bg-dark"
    :style="{ borderColor: `rgb(${color.red}, ${color.green}, ${color.blue})` }"
  >
    <VueFlow class="relative font-mono">
      <template #edge-rgb-line="rgbLineProps">
        <CustomEdge
          v-bind="{ ...rgbLineProps, data: { text: color[rgbLineProps.data?.color], ...rgbLineProps.data } }"
        />
      </template>
      <template #node-rgb="rgbProps">
        <RGBNode v-bind="rgbProps" :amount="color" @change="onChange" />
      </template>
      <template #node-rgb-output="rgbOutputProps">
        <RGBOutputNode v-bind="rgbOutputProps" :rgb="`rgb(${color.red}, ${color.green}, ${color.blue})`" />
      </template>
      <!-- 控制器 -->
      <Controls class="hidden md:block" />
      <!-- 背景 -->
      <Background
        variant="lines" :pattern-color="`rgb(${color.red}, ${color.green}, ${color.blue})`"
        :gap="48" :size="1"
      />
      <!-- 小地图 -->
      <MiniMap
        class="hidden origin-bottom-right scale-25 transform sm:block lg:scale-75 md:scale-50"
        :node-color="nodeColor"
      />
    </VueFlow>
  </div>
</template>

<style scoped>

</style>
