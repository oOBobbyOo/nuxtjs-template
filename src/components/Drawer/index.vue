<script setup lang="ts">
// import type { DrawerProps } from 'element-plus'
defineOptions({ name: 'Drawer' })

withDefaults(defineProps<Props>(), {
  visible: false,
  direction: 'rtl',
})

const emit = defineEmits<{
  'update:visible': [visible: boolean]
  beforeClose: [done: (cancel?: boolean) => void]
}>()

interface Props {
  visible?: boolean
  title?: string
  direction?: 'rtl' | 'ltr' | 'ttb' | 'btt' | 'rtl'
}

function close() {
  emit('update:visible', false)
}
</script>

<template>
  <el-drawer
    :model-value="visible"
    :title="title"
    :direction="direction"
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
</template>

<style scoped></style>
