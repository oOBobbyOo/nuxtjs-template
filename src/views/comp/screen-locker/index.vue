<script setup lang="ts">
const show = ref(false)

function handleOpen() {
  show.value = true
}
</script>

<template>
  <Card title="锁屏">
    <el-button type="primary" @click="handleOpen">
      打开锁屏
    </el-button>

    <ScreenLock v-model:open="show" />
  </Card>
</template>

<style scoped></style>
