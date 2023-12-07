<script setup lang="ts">
import BasicBar from './components/BasicBar.vue'
import MixLineBar from './components/MixLineBar.vue'
import ClickableBar from './components/ClickableBar.vue'

const colResponsiveProps = reactive({
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 8,
  style: { height: '400px' },
})
</script>

<template>
  <el-row :gutter="16">
    <el-col v-bind="colResponsiveProps">
      <BasicBar />
    </el-col>
    <el-col v-bind="colResponsiveProps">
      <ClickableBar />
    </el-col>
    <el-col v-bind="colResponsiveProps">
      <MixLineBar />
    </el-col>
  </el-row>
</template>

<style scoped lang="less"></style>
