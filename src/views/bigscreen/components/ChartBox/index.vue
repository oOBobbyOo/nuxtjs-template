<script setup lang="ts">
import { BorderBox13 as DvBorderBox13 } from '@kjgl77/datav-vue3'

defineProps<{
  title: string
}>()
</script>

<template>
  <DvBorderBox13>
    <div v-if="title" class="title">
      {{ title }}
    </div>
    <slot />
  </DvBorderBox13>
</template>

<style scoped lang="less">
.title {
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 2px;
  background: linear-gradient(92deg, #0072ff, #00eaff 48%, #01aaff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: absolute;
  top: 6%;
  left: 3%;
}
</style>
