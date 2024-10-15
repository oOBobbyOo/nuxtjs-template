<script setup lang="ts">
const src = ref('https://unocss.dev/')
</script>

<template>
  <div h-full>
    <iframe class="wh-full" :src="src" />
  </div>
</template>
