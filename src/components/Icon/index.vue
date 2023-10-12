<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { isString } from '@/utils/is'

defineOptions({ name: 'Icon' })

const props = defineProps<Props>()

interface Props {
  icon: string
  color?: string
  size?: number | string
  spin?: boolean
}

const elRef = ref(null)

const SVG_END_WITH_FLAG = '|svg'
const isSvgIcon = computed(() => props.icon?.endsWith(SVG_END_WITH_FLAG))
const getSvgIcon = computed(() => props.icon.replace(SVG_END_WITH_FLAG, ''))

const getIconifyStyle = computed((): CSSProperties => {
  const { size, color } = props
  let fs = size
  if (isString(size))
    fs = Number.parseInt(size, 10)

  return {
    fontSize: `${fs}px`,
    color,
    display: 'inline-flex',
  }
})
</script>

<template>
  <SvgIcon v-if="isSvgIcon" :size="size" :name="getSvgIcon" :class="[$attrs.class]" :spin="spin" />
  <i
    v-else
    ref="elRef"
    class="app-iconify"
    :class="[getSvgIcon, $attrs.class, spin && 'app-iconify-spin']"
    :style="getIconifyStyle"
  />
</template>

<style scoped lang="less">
.app-iconify {
  min-width: 1em;
  min-height: 1em;

  &-spin {
    animation: loadingCircle 1s infinite linear;
  }
}
</style>
