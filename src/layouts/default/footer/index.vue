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
  box-shadow: 0 -1px 12px rgb(0 0 0 / 12%);

  @apply relative z-9 flex-center bg-white dark:bg-dark dark:text-white box-border dark:b-t-1 dark:b-t-dark-200;
}
</style>
