<script setup lang="ts">
defineOptions({ name: 'SwitchItem' })

withDefaults(defineProps<Props>(), {
  modelValue: false,
  activeText: '开',
  inactiveText: '关',
})

const emit = defineEmits<{
  'update:modelValue': [val: boolean | string | number]
}>()

interface Props {
  label: string
  modelValue?: boolean
  activeText?: string
  inactiveText?: string
  activeActionIcon?: string | Component
  inactiveActionIcon?: string | Component
}

const attrs = useAttrs()

function handleChange(val: boolean | string | number) {
  emit('update:modelValue', val)
}
</script>

<template>
  <div class="flex-y-center justify-between">
    <span>{{ label }}</span>
    <el-switch
      :model-value="modelValue"
      inline-prompt
      :active-text="activeText"
      :inactive-text="inactiveText"
      :active-action-icon="activeActionIcon"
      :inactive-action-icon="inactiveActionIcon"
      :attrs="attrs"
      @change="handleChange"
    >
      <template #active-action>
        <slot name="active-action" />
      </template>
      <template #inactive-action>
        <slot name="inactive-action" />
      </template>
    </el-switch>
  </div>
</template>

<style scoped></style>
