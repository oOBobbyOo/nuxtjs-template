<script setup lang="ts">
import { useAppStore } from '@/stores/modules/app'

defineOptions({ name: 'LayoutPage' })

const app = useAppStore()
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade-slide" mode="out-in" :appear="true">
      <component
        :is="Component"
        v-if="app.reloadFlag"
        class="transition duration-300 ease-in-out"
      />
    </transition>
  </router-view>
</template>

<style scoped lang="less"></style>
