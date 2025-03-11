<script setup lang="ts">
const { author } = useAppConfig()
</script>

<template>
  <UFooter :ui="{
    bottom: { wrapper: 'border-t border-gray-200 dark:border-gray-800', container: '!py-6' },
    top: { wrapper: 'border-t border-gray-200 dark:border-gray-800', container: 'py-8 lg:py-12' }
  }">
    <template #center>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © 2023~{{ new Date().getFullYear() }} {{ author?.name || '' }}. All rights reserved. </p>
    </template>
  </UFooter>
</template>