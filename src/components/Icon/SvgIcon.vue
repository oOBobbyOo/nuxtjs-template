<script setup lang="ts">
import type { CSSProperties } from 'vue'

defineOptions({ name: 'SvgIcon' })

const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
  size: 16,
  spin: false,
})

interface Props {
  prefix?: string
  name: string
  size?: number | string
  spin?: boolean
}

const symbolId = computed(() => `#${props.prefix}-${props.name}`)

const getStyle = computed((): CSSProperties => {
  const { size } = props
  let s = `${size}`
  s = `${s.replace('px', '')}px`
  return {
    width: s,
    height: s,
  }
})
</script>

<template>
  <svg :class="[$attrs.class, spin && 'svg-icon-spin']" :style="getStyle" aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>

<style scoped lang="less">
.svg-icon-spin {
  animation: loadingCircle 1s infinite linear;
}
</style>
