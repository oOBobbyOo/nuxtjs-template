<script setup lang="ts">
import { pkgJson } from './model'

defineOptions({ name: 'DevDependency' })

const { devDependencies } = pkgJson
</script>

<template>
  <el-card shadow="hover" body-class="card-body">
    <template #header>
      <div class="card-header">
        <span>开发环境依赖</span>
      </div>
    </template>
    <el-descriptions border>
      <el-descriptions-item
        v-for="item in devDependencies"
        :key="item.name"
        :label="item.name"
        label-class-name="text-truncate"
        class-name="text-truncate"
      >
        {{ item.version }}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>
