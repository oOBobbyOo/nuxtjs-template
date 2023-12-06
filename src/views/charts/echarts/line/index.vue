<script setup lang="ts">
import BasicLine from './components/BasicLine.vue'
import StackedLine from './components/StackedLine.vue'
import GradientLine from './components/GradientLine.vue'
import MarkLine from './components/MarkLine.vue'
import StepLine from './components/StepLine.vue'
import ZoomLine from './components/ZoomLine.vue'

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
      <BasicLine />
    </el-col>
    <el-col v-bind="colResponsiveProps">
      <StackedLine />
    </el-col>
    <el-col v-bind="colResponsiveProps">
      <GradientLine />
    </el-col>
    <el-col v-bind="colResponsiveProps">
      <MarkLine />
    </el-col>
    <el-col v-bind="colResponsiveProps">
      <StepLine />
    </el-col>
    <el-col v-bind="colResponsiveProps">
      <ZoomLine />
    </el-col>
  </el-row>
</template>

<style scoped lang="less"></style>
