<script setup lang="ts">
// 图形验证码
import GraphicCode from './modules/graphic-code.vue'

// 运算验证码
import OperationCode from './modules/operation-code.vue'

// 滑块验证码
import DragCode from './modules/drag-code.vue'

// 图片旋转验证码
import RotateCode from './modules/rotate-code.vue'

// 拼图验证码
import PuzzleCode from './modules/puzzle-code.vue'

// 点选验证码
import PointsCode from './modules/points-code.vue'
</script>

<template>
  <div class="space-y-4">
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="mb-4">
        <GraphicCode />
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="mb-4">
        <OperationCode />
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="mb-4">
        <DragCode />
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="mb-4">
        <RotateCode />
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="mb-4">
        <PuzzleCode />
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="mb-4">
        <PointsCode />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
