<script setup lang="ts">
import GraphicCode from './modules/graphic-code.vue' // 图形验证码
</script>

<template>
  <div class="space-y-4">
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="mb-4">
        <GraphicCode />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
