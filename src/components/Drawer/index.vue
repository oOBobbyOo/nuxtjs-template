<script setup lang="ts">
defineOptions({ name: 'Drawer' })

withDefaults(defineProps<Props>(), {
  modelValue: false,
  direction: 'rtl',
})

const emit = defineEmits<{
  'update:modelValue': [visible: boolean]
  beforeClose: [done: (cancel?: boolean) => void]
}>()

interface Props {
  modelValue?: boolean
  title?: string
  direction?: 'rtl' | 'ltr' | 'ttb' | 'btt'
}

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <Teleport to="body">
    <el-drawer
      :model-value="modelValue"
      :title="title"
      close-on-click-modal
      close-on-press-escape
      v-bind="$attrs"
      class="drawer-modal"
      @close="close"
    >
      <template #header>
        <slot name="header" />
      </template>

      <template #default>
        <slot />
      </template>

      <template #footer>
        <slot name="footer" />
      </template>
    </el-drawer>
  </Teleport>
</template>
