<script setup lang="ts">
import ViewsChart, { type Props } from './ViewsChart.vue'

const props = defineProps<Props>()
</script>

<template>
  <ViewsChart v-bind="props" :style="{ width: '100%', height: '400px' }" />
</template>

<style scoped></style>
