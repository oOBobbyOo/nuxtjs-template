<script setup lang="ts">
import BasicPie from './components/BasicPie.vue'
import DoughnutPie from './components/DoughnutPie.vue'
import MultiDoughnutPie from './components/MultiDoughnutPie.vue'

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
      <BasicPie />
    </el-col>
    <el-col v-bind="colResponsiveProps">
      <DoughnutPie />
    </el-col>
    <el-col v-bind="colResponsiveProps">
      <MultiDoughnutPie />
    </el-col>
  </el-row>
</template>

<style scoped lang="less"></style>
