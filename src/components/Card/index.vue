<script setup lang="ts">
defineOptions({ name: 'Card' })

defineProps<Props>()

defineSlots()

interface Props {
  title?: string
  shadow?: 'always' | 'hover' | 'never'
}
</script>

<template>
  <el-card :shadow="shadow">
    <template v-if="title" #header>
      <div class="card-header flex-between">
        <span>{{ title }}</span>
        <slot name="operation" />
      </div>
    </template>
    <slot />
  </el-card>
</template>

<style scoped lang="less">

</style>
