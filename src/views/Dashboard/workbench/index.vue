<script setup lang="ts">
import WorkbenchHeader from './components/WorkbenchHeader/index.vue'
import DynamicInfo from './components/DynamicInfo/index.vue'
import CalendarInfo from './components/CalendarInfo/index.vue'
</script>

<template>
  <div space-y-4>
    <WorkbenchHeader />

    <el-row :gutter="16">
      <el-col :xl="16" :lg="16" :md="24" :sm="24" :xs="24" class="mb-4">
        <CalendarInfo />
      </el-col>
      <el-col :xl="8" :lg="8" :md="24" :sm="24" :xs="24" class="mb-4">
        <DynamicInfo />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
