<script setup lang="ts">
import MultipleTabs from '../components/MultipleTabs/index.vue'
import LayoutHeader from './header/m.vue'
import LayoutSidebar from './sidebar/m.vue'
import LayoutContent from './content/index.vue'
import LayoutFooter from './footer/index.vue'

defineOptions({ name: 'MobileLayout' })
</script>

<template>
  <div h-screen w-full flex flex-col>
    <LayoutHeader />
    <LayoutSidebar />

    <div flex-auto overflow-hidden>
      <MultipleTabs />
      <LayoutContent />
      <BackTop />
    </div>
    <LayoutFooter />
  </div>
</template>

<style scoped lang="less"></style>
