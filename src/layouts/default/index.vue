<script setup lang="ts">
import PcLayout from './PcLayout.vue'
import MobileLayout from './MobileLayout.vue'

defineOptions({ name: 'DefaultLayout' })
</script>

<template>
  <template v-if="isMobile">
    <MobileLayout />
  </template>
  <template v-else>
    <PcLayout />
  </template>
</template>

<style scoped lang="less"></style>
