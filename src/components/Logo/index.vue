<script setup lang="ts">
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

defineOptions({ name: 'Logo' })

const { getCollapsed } = useMenuSetting()
</script>

<template>
  <div m-4 h-8 flex-center>
    <h1 className="logo-text">
      {{ getCollapsed ? 'HA' : 'Heny Admin' }}
    </h1>
  </div>
</template>

<style scoped lang="less">
.logo-text {
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  text-align: center;
  white-space: nowrap;
  list-style-type: none;
  background-image: linear-gradient(
    to right,
    #0a98d2,
    #1ffdc4,
    #0a98d2,
    orange,
    #0a98d2,
    #1ffdc4,
    #0a98d2
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  background-size: 200% 100%;
  animation: bgp 8s infinite linear;
}

@keyframes bgp {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: -100% 0;
  }
}
</style>
