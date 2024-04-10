<script setup lang="ts">
import WorkbenchHeader from './components/WorkbenchHeader/index.vue'
import DynamicInfo from './components/DynamicInfo/index.vue'
</script>

<template>
  <div space-y-4>
    <WorkbenchHeader />

    <el-row :gutter="16">
      <el-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
        <DynamicInfo />
      </el-col>
      <el-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24" />
    </el-row>
  </div>
</template>

<style scoped></style>
