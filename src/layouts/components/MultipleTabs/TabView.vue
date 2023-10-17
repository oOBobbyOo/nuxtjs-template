<script setup lang="ts">
import type { Slots, TabProps } from './types'
import TabButton from './TabButton.vue'

defineOptions({
  name: 'TabView',
})

const props = withDefaults(defineProps<TabProps>(), {
  commonClass: 'transition-all-300',
  activeColor: '#1890ff',
  closable: true,
})

const emit = defineEmits<Emits>()

defineSlots<Slots>()

const bindProps = computed(() => {
  const { ...rest } = props
  return rest
})

interface Emits {
  (e: 'close'): void
}

function handleClose() {
  emit('close')
}
</script>

<template>
  <Component :is="TabButton" v-bind="bindProps">
    <template #prefix>
      <slot name="prefix" />
    </template>
    <slot />
    <template #suffix>
      <slot name="suffix">
        <Icon v-if="closable" class="icon-close" icon="mdi:close" @click="handleClose" />
      </slot>
    </template>
  </Component>
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
    background-color: #9ca3af;
  }
}

.tab-active {
  .icon-close {
    &:hover {
      background-color: #1890ff;
    }
  }
}
</style>
