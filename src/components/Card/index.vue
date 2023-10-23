<script setup lang="ts">
import type { CSSProperties } from 'vue'

defineOptions({ name: 'Card' })

defineProps<Props>()

defineSlots()

interface Props {
  title?: string
  shadow?: 'always' | 'hover' | 'never'
  bodyStyle?: CSSProperties
  bodyClass?: string
}
</script>

<template>
  <el-card :shadow="shadow" :body-style="bodyStyle" :body-class="bodyClass">
    <template v-if="title" #header>
      <div class="card-header flex-between">
        <span>{{ title }}</span>
        <slot name="operation" />
      </div>
    </template>
    <slot />
  </el-card>
</template>

<style scoped lang="less"></style>
