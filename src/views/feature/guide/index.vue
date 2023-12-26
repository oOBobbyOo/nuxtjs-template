<script setup lang="ts">
import { useGuide } from '@/hooks/web/useGuide'

const driverObj = useGuide()

function handleStart() {
  driverObj.drive()
}
</script>

<template>
  <Card title="引导页">
    <el-button type="primary" @click="handleStart">
      开始
    </el-button>
  </Card>
</template>

<style scoped></style>
