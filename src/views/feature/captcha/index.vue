<script setup lang="ts">
// 图形验证码
import GraphicCode from './modules/graphic-code.vue'

// 运算验证码
import OperationCode from './modules/operation-code.vue'
</script>

<template>
  <div class="space-y-4">
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-4">
        <GraphicCode />
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-4">
        <OperationCode />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
