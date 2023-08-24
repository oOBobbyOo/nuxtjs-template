<script setup lang="ts">
const color = useColorMode()

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button class="!outline-none" @click="toggleDark">
    <Icon :name="color.value === 'dark' ? 'carbon:moon' : 'carbon:sun'" size="20" />
  </button>
</template>
