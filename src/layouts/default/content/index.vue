<script setup lang="ts">
defineOptions({ name: 'LayoutContent' })
</script>

<template>
  <div class="layout-content overscroll-auto p-4">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="less">
.layout-content {
  height: calc(100vh - 112px);
}
</style>
