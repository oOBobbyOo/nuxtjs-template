<script setup lang="ts">
const notify = ref(true)
</script>

<template>
  <el-switch v-model="notify" inline-prompt active-text="开" inactive-text="关" />
</template>

<style scoped></style>
