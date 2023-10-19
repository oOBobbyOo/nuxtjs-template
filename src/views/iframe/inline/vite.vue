<script setup lang="ts">
const src = ref('https://cn.vitejs.dev/')
</script>

<template>
  <div h-full>
    <iframe class="wh-full" :src="src" />
  </div>
</template>
