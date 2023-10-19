<script setup lang="ts">
import type { Slots, TabProps } from './types'
import TabButton from './TabButton.vue'
import ContextMenu from './ContextMenu.vue'

defineOptions({ name: 'TabView' })

const props = withDefaults(defineProps<TabProps>(), {
  closable: true,
})

const emits = defineEmits<Emits>()

defineSlots<Slots>()

interface Emits {
  (e: 'closeTab' | 'clickTab'): void
}

const bindProps = computed(() => {
  const { ...rest } = props
  return rest
})

function handleCloseTab() {
  emits('closeTab')
}

function handleClickTab() {
  emits('clickTab')
}
</script>

<template>
  <ContextMenu :full-path="fullPath" @click-tab="handleClickTab">
    <Component :is="TabButton" v-bind="bindProps">
      <template #prefix>
        <slot name="prefix" />
      </template>
      <slot />
      <template #suffix>
        <slot name="suffix">
          <Icon v-if="closable" class="icon-close" icon="mdi:close" @click.stop="handleCloseTab" />
        </slot>
      </template>
    </Component>
  </ContextMenu>
</template>

<style scoped lang="less">
.icon-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  font-size: 14px;
  border-radius: 50%;

  &:hover {
    font-size: 12px;
    color: #fff;
    background-color: var(--hb-icon-close-hover-color);
  }
}

.tab-active {
  .icon-close {
    &:hover {
      background-color: var(--hb-icon-close-active-color);
    }
  }
}
</style>
