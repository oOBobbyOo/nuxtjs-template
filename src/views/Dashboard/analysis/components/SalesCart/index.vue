<script setup lang="ts">
import SalesChart, { type Props } from './SalesChart.vue'

const props = defineProps<Props>()
</script>

<template>
  <SalesChart v-bind="props" :style="{ width: '100%', height: '400px' }" />
</template>

<style scoped></style>
