<script setup lang="ts">
import { ref } from 'vue'
import { isClient } from '@vueuse/shared'
import { useDraggable } from '@vueuse/core'
import { UseDraggable } from '@vueuse/components'

const el = ref<HTMLElement | null>(null)
const handle = ref<HTMLElement | null>(null)

const innerWidth = isClient ? window.innerWidth : 200

const { x, y, style } = useDraggable(el, {
  initialValue: { x: innerWidth / 4.2, y: 150 },
  preventDefault: true,
})
</script>

<template>
  <div>
    <p class="text-center italic op50">
      Check the floating boxes
    </p>
    <div
      ref="el"
      p="x-4 y-2"
      border="~ gray-400/30 rounded"
      shadow="~ hover:lg"
      class="fixed z-999999 cursor-move select-none"
      style="touch-action: none"
      :style="style"
    >
      👋 Drag me!
      <div class="text-sm opacity-50">
        I am at {{ Math.round(x) }}, {{ Math.round(y) }}
      </div>
    </div>

    <UseDraggable
      v-slot="{ x, y }"
      p="x-4 y-2"
      border="~ gray-400/30 rounded"
      shadow="~ hover:lg"
      class="fixed z-999999 cursor-move select-none"
      :initial-value="{ x: innerWidth / 3.9, y: 250 }"
      :prevent-default="true"
      storage-key="vueuse-draggable-pos"
      storage-type="session"
    >
      Renderless component
      <div class="text-xs opacity-50">
        Position persisted in sessionStorage
      </div>
      <div class="text-sm opacity-50">
        {{ Math.round(x) }}, {{ Math.round(y) }}
      </div>
    </UseDraggable>

    <UseDraggable
      v-slot="{ x, y }"
      p="x-4 y-2"
      border="~ gray-400/30 rounded"
      shadow="~ hover:lg"
      class="fixed z-999999 select-none"
      :initial-value="{ x: innerWidth / 3.6, y: 350 }"
      :prevent-default="true"
      :handle="handle"
    >
      <div ref="handle" class="cursor-move">
        👋 Drag here!
      </div>
      <div class="text-xs opacity-50">
        Handle that triggers the drag event
      </div>
      <div class="text-sm opacity-50">
        I am at {{ Math.round(x) }}, {{ Math.round(y) }}
      </div>
    </UseDraggable>
  </div>
</template>
