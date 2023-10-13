<script setup lang="ts">
defineOptions({ name: 'LayoutFooter' })
</script>

<template>
  <div class="layout-footer">
    Created by Henry Bobby
  </div>
</template>

<style scoped lang="less">
.layout-footer {
  height: 48px;

  @apply flex-center  bg-white dark:bg-dark dark:text-white;
}
</style>
