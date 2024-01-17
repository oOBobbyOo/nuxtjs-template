<script setup lang="ts">
import BasicLine from './components/Line/BasicLine.vue'
import GroupLine from './components/Line/GroupLine.vue'

import BasicBar from './components/Bar/BasicBar.vue'
import StackBar from './components/Bar/StackBar.vue'

import BasicPie from './components/Pie/BasicPie.vue'
import DoughnutPie from './components/Pie/DoughnutPie.vue'

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
  <div class="space-y-4">
    <Card title="折线图">
      <el-row :gutter="16">
        <el-col v-bind="colResponsiveProps">
          <BasicLine />
        </el-col>
        <el-col v-bind="colResponsiveProps">
          <GroupLine />
        </el-col>
      </el-row>
    </Card>
    <Card title="柱状图">
      <el-row :gutter="16">
        <el-col v-bind="colResponsiveProps">
          <BasicBar />
        </el-col>
        <el-col v-bind="colResponsiveProps">
          <StackBar />
        </el-col>
      </el-row>
    </Card>
    <Card title="饼图">
      <el-row :gutter="16">
        <el-col v-bind="colResponsiveProps">
          <BasicPie />
        </el-col>
        <el-col v-bind="colResponsiveProps">
          <DoughnutPie />
        </el-col>
      </el-row>
    </Card>
  </div>
</template>

<style scoped></style>
