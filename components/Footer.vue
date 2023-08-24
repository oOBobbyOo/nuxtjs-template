<script setup lang="ts">
const { author } = useAppConfig()
</script>

<template>
  <footer
    class="w-full flex-center border-t border-gray-950/10 py-4 dark:border-gray-50/[0.2]"
  >
    Copyright © {{ author?.year || new Date().getFullYear() }} by
    {{ author?.name || '' }}. All rights reserved.
  </footer>
</template>
