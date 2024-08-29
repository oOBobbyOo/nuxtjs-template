<script setup lang="ts">
import { useThemeStore } from '@/stores/modules/theme'

const themeStore = useThemeStore()
const themeColor = computed(() => themeStore.themeColor)

const percentage = ref(0)

setInterval(() => {
  percentage.value = percentage.value + 1
}, 100)

const colResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 12,
  style: { marginBottom: '16px', display: 'flex', justifyContent: 'center' },
}
</script>

<template>
  <div flex-center flex-col space-y-10>
    <PinBallLoading />

    <ColorCircleLoading />

    <el-row :gutter="100">
      <el-col v-bind="colResponsiveProps">
        <ModelLoading
          :style="{ width: '200px' }" :stroke-color="themeColor" :percentage="percentage" :model-size="200"
          model="yasuo"
        />
      </el-col>
      <el-col v-bind="colResponsiveProps">
        <ModelLoading
          :style="{ width: '200px' }" :stroke-color="themeColor" :percentage="percentage" :model-size="200"
          model="yi"
        />
      </el-col>
    </el-row>

    <MoveLoading />
  </div>
</template>
