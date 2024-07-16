<script setup lang="ts">
import { useThemeStore } from '@/stores/modules/theme'

const themeStore = useThemeStore()
const themeColor = computed(() => themeStore.themeColor)

const percentage = ref(0)

setInterval(() => {
  percentage.value = percentage.value + 1
}, 100)
</script>

<template>
  <div h-full flex-center flex-col space-y-10>
    <ModelLoading
      :style="{ width: '200px' }" :stroke-color="themeColor" :percentage="percentage" :model-size="200"
      model="yasuo"
    />

    <ModelLoading
      :style="{ width: '200px' }" :stroke-color="themeColor" :percentage="percentage" :model-size="200"
      model="yi"
    />
  </div>
</template>
