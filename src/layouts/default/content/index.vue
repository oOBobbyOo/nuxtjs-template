<script setup lang="ts">
import { useAppStore } from '@/stores/modules/app'

defineOptions({ name: 'LayoutContent' })

const app = useAppStore()
</script>

<template>
  <div
    class="layout-content flex flex-col overflow-x-hidden overflow-y-auto bg-gray-50 p-4 dark:bg-dark-8"
  >
    <router-view v-slot="{ Component }">
      <transition name="fade-slide" mode="out-in" :appear="true">
        <component
          :is="Component"
          v-if="app.reloadFlag"
          class="transition duration-300 ease-in-out"
        />
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="less">
.layout-content {
  height: calc(100vh - 156px);
}
</style>
