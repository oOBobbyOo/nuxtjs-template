<script setup lang="ts">
import useScroll, { type Props } from './useScroll'

defineOptions({ name: 'BetterScroll' })

const props = withDefaults(defineProps<Props>(), {
  probeType: 0,
  scrollX: false,
  scrollY: true,
  click: true,
  listenScroll: false,
  beforeScroll: false,
  afterScroll: false,
})

const emits = defineEmits(['scroll', 'beforeScroll', 'afterScroll'])

const bsWrap = ref<HTMLElement>()
const bsContent = ref<HTMLElement>()
const isScrollY = computed(() => Boolean(props.options?.scrollY))

const { bsInstance, scroll, disable, enable, refresh, scrollTo, scrollToElement } = useScroll(
  bsWrap,
  props,
  emits,
)

defineExpose({ bsInstance, scroll, disable, enable, refresh, scrollTo, scrollToElement })
</script>

<template>
  <div ref="bsWrap" class="h-full">
    <div ref="bsContent" class="inline-block" :class="{ 'h-full': !isScrollY }">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
