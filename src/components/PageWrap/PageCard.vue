<script setup lang="ts">
defineOptions({ name: 'PageCard' })

defineSlots()
</script>

<template>
  <div class="page-card">
    <slot />
  </div>
</template>

<style scoped lang="less">
.page-card {
  @apply bg-white dark:bg-dark;

  position: relative;
  padding: 24px;
  border-radius: 4px;
  box-shadow:
    0 1px 2px 0 rgb(0 0 0 / 3%),
    0 1px 6px -1px rgb(0 0 0 / 2%),
    0 2px 4px 0 rgb(0 0 0 / 2%);
}
</style>
