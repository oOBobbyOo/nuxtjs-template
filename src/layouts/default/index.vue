<script setup lang="ts">
import LayoutSidebar from './sidebar/index.vue'
import LayoutHeader from './header/index.vue'
import LayoutContent from './content/index.vue'
import LayoutFooter from './footer/index.vue'

defineOptions({ name: 'DefaultLayout' })
</script>

<template>
  <div h-screen w-full flex flex-row>
    <LayoutSidebar />
    <div flex-auto overflow-hidden>
      <LayoutHeader />
      <LayoutContent />
      <LayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="less"></style>
