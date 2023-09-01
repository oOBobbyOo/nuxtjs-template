<script setup lang="ts">
import { vElementHover } from '@vueuse/components'

const props = withDefaults(
  defineProps<{
    code: string
    filename?: string
    language?: string
    meta?: string
    highlights?: number[]
  }>(),
  {
    code: '',
  },
)

const isHovered = ref(false)

function onHover(state: boolean) {
  isHovered.value = state
}
</script>

<template>
  <div class="prose-code">
    <code v-element-hover="onHover">
      <span class="filename">{{ props.filename }}</span>
      <slot />
      <CopyButton :code="props.code" :is-hovered="isHovered" />
    </code>
  </div>
</template>

<style lang="scss">
.prose-code {
  --at-apply: w-full relative b-rd-2 b-1 b-solid b-gray-200 dark:b-gray-800 bg-gray-100
   dark:bg-gray-900 c-gray-700 dark:c-gray-200 my-[18px] text-[14px];

  .filename {
    --at-apply: absolute t-0 px-2 py-3 inset-e-0 text-xs leading-normal b-rd-3
    c-gray-700 dark:c-gray-300 opacity-100 transition-opacity-200;
  }

  &:hover {
    .filename {
      opacity: 0;
    }
  }

  pre {
    padding: 16px;
  }
}
</style>
