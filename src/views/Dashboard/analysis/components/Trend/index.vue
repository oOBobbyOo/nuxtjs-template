<script setup lang="ts">
interface Props {
  label: string
  value: number | string
  icon?: string
  color?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-center text-ellipsis text-sm">
    <span>{{ label }}</span>
    <span class="ml-2 mr-1">{{ value }}</span>
    <Icon v-if="icon" :icon="icon" :color="color" size="24" />
  </div>
</template>

<style scoped></style>
