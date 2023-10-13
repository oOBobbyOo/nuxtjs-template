<script setup lang="ts">
import { DevDependency, ProDependency } from './components'
</script>

<template>
  <div class="about space-y-4">
    <ProDependency />
    <DevDependency />
  </div>
</template>

<style scoped lang="less">
.about {
  ::v-deep(.el-descriptions__body) {
    overflow-x: auto;
  }
}
</style>
