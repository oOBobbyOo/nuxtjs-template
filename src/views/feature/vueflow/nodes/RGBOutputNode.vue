<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'

interface RBGOutputNodeProps {
  rgb: string
}

defineProps<RBGOutputNodeProps>()
</script>

<template>
  <div
    :style="{ backgroundColor: rgb }"
    class="min-w-[220px] border-2 border-white rounded-xl px-6 py-2 text-center text-white"
  >
    <div class="text-xl font-bold">
      Color Output
    </div>
    <div class="font-semibold">
      {{ rgb }}
    </div>
    <Handle type="target" :position="Position.Left" :style="{ left: '-6px', width: '12px', height: '12px' }" />
  </div>
</template>

<style scoped></style>
