<script setup lang="ts">
import { BorderBox13 as DvBorderBox13 } from '@kjgl77/datav-vue3'

defineProps<{
  title?: string
}>()
</script>

<template>
  <DvBorderBox13>
    <div v-if="title" class="title">
      <div class="icon left-icon" />
      <span px-2>{{ title }}</span>
      <div class="icon right-icon" />
    </div>
    <slot />
  </DvBorderBox13>
</template>

<style scoped lang="less">
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 2px;
  background: linear-gradient(92deg, #0072ff, #00eaff 48%, #01aaff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: absolute;
  top: 6%;
  left: 1%;

  .icon {
    width: 58px;
    height: 14px;
    &.left-icon {
      background: url('@/assets/big-screen/title-r.png') no-repeat;
      background-size: 100% 100%;
    }
    &.right-icon {
      background: url('@/assets/big-screen/title-l.png') no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
