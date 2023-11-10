<script setup lang="ts">
defineOptions({ name: 'SwitchDarkMode' })
</script>

<template>
  <div class="absolute left-8 top-8 cursor-pointer" @click="toggleDarkMode">
    <Icon size="24" :icon="isDark ? 'sun|svg' : 'moon|svg'" />
  </div>
</template>

<style scoped></style>
