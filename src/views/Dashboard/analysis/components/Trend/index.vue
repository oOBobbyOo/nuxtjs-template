<script setup lang="ts">
interface Props {
  label: string
  value: number
  icon?: string
  decimalPlaces?: number
  prefix?: string
  suffix?: string
  color?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-center text-ellipsis text-sm">
    <span>{{ label }}</span>
    <CountTo
      class="ml-2 mr-1"
      :prefix="prefix"
      :suffix="suffix"
      :color="color"
      :decimal-places="decimalPlaces"
      :end-val="value"
    />
    <Icon v-if="icon" :icon="icon" :color="color" size="24" />
  </div>
</template>

<style scoped></style>
