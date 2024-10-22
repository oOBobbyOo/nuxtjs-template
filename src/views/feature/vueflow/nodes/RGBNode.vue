<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Handle, Position } from '@vue-flow/core'
import type { Colors } from '../flows/RGB.vue'

interface RGBNodeProps extends Pick<NodeProps<{ color: Colors }>, 'data'> {
  data: {
    color: Colors
  }
  amount: Record<Colors, number>
}

const props = defineProps<RGBNodeProps>()

const emit = defineEmits<{ (event: 'change', data: { color: Colors; val: number }): void }>()

const currentColor = toRef(props.data, 'color', 'red')

function onChange(e: InputEvent) {
  return emit('change', { color: currentColor.value, val: Number.parseInt((e.target as HTMLInputElement).value) })
}
</script>

<template>
  <div
    class="scale-75 transform border-2 border-black rounded-md border-solid bg-white px-4 py-2 text-left lg:scale-100"
  >
    <div class="text-md text-center font-semibold" :style="{ color: currentColor }">
      {{ `${currentColor}`.toUpperCase() }}
    </div>

    <input
      :value="amount[currentColor]" class="slider nodrag" :style="{ '--color': currentColor }" type="range" min="0"
      max="255" @change="onChange"
    >

    <Handle
      type="source" :position="Position.Right"
      :style="{ backgroundColor: currentColor, right: '-6px', width: '12px', height: '12px' }"
    />
  </div>
</template>

<style scoped></style>
