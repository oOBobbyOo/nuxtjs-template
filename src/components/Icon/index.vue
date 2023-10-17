<script setup lang="ts">
import type { CSSProperties } from 'vue'
import Iconify from '@iconify/iconify'
import { isString } from '@/utils/is'

defineOptions({ name: 'Icon' })

const props = defineProps<Props>()

interface Props {
  icon: string
  color?: string
  size?: number | string
  spin?: boolean
  prefix?: string
}

const elRef = ref(null)

const SVG_END_WITH_FLAG = '|svg'
const isSvgIcon = computed(() => props.icon?.endsWith(SVG_END_WITH_FLAG))
const getSvgIcon = computed(() => props.icon.replace(SVG_END_WITH_FLAG, ''))
const getIconRef = computed(() => `${props.prefix ? `${props.prefix}:` : ''}${props.icon}`)

async function update() {
  if (unref(isSvgIcon))
    return

  const el: any = unref(elRef)
  if (!el)
    return

  await nextTick()

  const icon = unref(getIconRef)
  if (!icon)
    return

  const svg = Iconify.renderSVG(icon, {})

  if (svg) {
    el.textContent = ''
    el.appendChild(svg)
  }
  else {
    const span = document.createElement('span')
    span.className = 'iconify'
    span.dataset.icon = icon
    el.textContent = ''
    el.appendChild(span)
  }
}

watch(() => props.icon, update, { flush: 'post' })

onMounted(update)

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
    :class="[$attrs.class, spin && 'app-iconify-spin']"
    :style="getIconifyStyle"
  />
</template>

<style lang="less">
.app-iconify {
  display: inline-block;

  &-spin {
    animation: loadingCircle 1s infinite linear;
  }

  .iconify {
    display: inline-block;
    min-width: 1em;
    min-height: 1em;
  }
}
</style>
