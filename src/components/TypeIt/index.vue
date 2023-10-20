<script setup lang="ts">
import TypeIt from 'typeit'

defineOptions({ name: 'TypeIt' })

const props = defineProps<Props>()

interface Props {
  strings: string[]
}

const typeitRef = ref()

onMounted(() => {
  if (!typeitRef.value)
    return

  new TypeIt(typeitRef.value, {
    strings: props.strings,
  }).go()
})
</script>

<template>
  <span ref="typeitRef" class="typeit" />
</template>

<style scoped lang="less"></style>
