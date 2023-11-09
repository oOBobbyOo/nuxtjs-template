<script setup lang="ts">
import { Lizi } from './lizi.ts'

interface Props {
  amountX?: number
  amountY?: number
  color?: string
  top?: number
}

const props = withDefaults(defineProps<Props>(), {
  amountX: 50,
  amountY: 50,
  color: '#097bdb',
  top: 350,
})

const elRef = ref<HTMLElement>()

onMounted(() => {
  if (!elRef.value)
    return

  const lizi = new Lizi({
    el: elRef.value,
    ...props,
  })

  lizi.animate()
})
</script>

<template>
  <div ref="elRef" class="absolute-lt z--1 wh-full" />
</template>

<style scoped></style>
